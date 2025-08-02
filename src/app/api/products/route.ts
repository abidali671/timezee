import { NextRequest, NextResponse } from 'next/server';
import client, { mapContentfulEntryToProduct } from '@/lib/contentfull/client';
import { Product } from '@/context/productsContext';
import { createContentfulProduct } from '@/lib/contentfull/management';
import { getEnvironment } from '@/lib/contentful-services';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const searchQuery = searchParams.get('query') || '';
        const categoryId = searchParams.get('category');
        const brandId = searchParams.get('brand');

        const skip = (page - 1) * limit;

        const contentfulQuery: any = {
            content_type: 'products',
            limit,
            skip,
            include: 2, // Include linked entries (brands and categories)
        };

        if (searchQuery) {
            contentfulQuery['query'] = searchQuery;
        }

        if (categoryId) {
            contentfulQuery['fields.category.sys.id'] = categoryId;
        }

        if (brandId) {
            contentfulQuery['fields.brands.sys.id'] = brandId;
        }

        const entries = await client.getEntries(contentfulQuery);

        const environment = await getEnvironment();
        const [brandsResponse, categoriesResponse] = await Promise.all([
            environment.getEntries({ content_type: 'brands', limit: 1000 }),
            environment.getEntries({ content_type: 'categories', limit: 1000 })
        ]);

        const products: Product[] = entries.items.map(mapContentfulEntryToProduct);
        const brands = brandsResponse.items.map((brand: any) => ({
            id: brand.sys.id,
            name: brand.fields.name?.['en-US'] || 'Unnamed Brand'
        }));
        const categories = categoriesResponse.items.map((category: any) => ({
            id: category.sys.id,
            name: category.fields.name?.['en-US'] || 'Unnamed Category'
        }));

        return NextResponse.json({
            items: products,
            count: products.length,
            total: entries.total,
            page,
            totalPages: Math.ceil(entries.total / limit),
            brands,
            categories
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const json = formData.get('data');
        if (!json || typeof json !== 'string') {
            return NextResponse.json(
                { message: 'Missing or invalid product data in request' },
                { status: 400 }
            );
        }

        const productData: Product = JSON.parse(json);

        // Validate required fields
        if (!productData.name || !productData.price || !productData.brands) {
            return NextResponse.json(
                { message: 'Missing required fields (name, price, or brand)' },
                { status: 400 }
            );
        }

        const imageFileFromForm = formData.get('image');

        let imageToPassToContentful: File | null = null;

        // Ensure the uploaded file is of type File
        if (imageFileFromForm instanceof File) {
            imageToPassToContentful = imageFileFromForm;
        }
        // If imageFileFromForm is null/undefined (no image uploaded),
        // imageToPassToContentful remains null, which is correct for createContentfulProduct.

        const createdProduct = await createContentfulProduct(productData, imageToPassToContentful);

        // --- Re-evaluate this section ---
        // As discussed, fetching brands and categories on *every* product creation
        // is likely inefficient. Consider if this is truly necessary for your UI flow.
        const [brandsResponse, categoriesResponse] = await Promise.all([
            client.getEntries({ content_type: 'brands', limit: 1000 }),
            client.getEntries({ content_type: 'categories', limit: 1000 }),
        ]);

        const brands = brandsResponse.items.map((brand: any) => ({
            id: brand.sys.id,
            name: brand.fields.name?.['en-US'] || 'Unnamed Brand',
        }));
        const categories = categoriesResponse.items.map((category: any) => ({
            id: category.sys.id,
            name: category.fields.name?.['en-US'] || 'Unnamed Category',
        }));

        return NextResponse.json(
            {
                data: createdProduct,
                brands,
                categories,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('API create product error:', error);
        return NextResponse.json(
            {
                message: 'Failed to create product',
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}