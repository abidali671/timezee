import { NextResponse } from 'next/server';
import client, { mapContentfulEntryToProduct } from '@/lib/contentfull/client';
import { Product } from '@/context/productsContext';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const searchQuery = searchParams.get('query') || '';

        const skip = (page - 1) * limit;

        const contentfulQuery: any = {
            content_type: 'products',
            limit,
            skip,
        };

        if (searchQuery) {
            contentfulQuery['query'] = searchQuery;
        }

        const entries = await client.getEntries(contentfulQuery);

        const products: Product[] = entries.items.map(mapContentfulEntryToProduct);

        return NextResponse.json({
            items: products,
            count: products.length,
            total: entries.total,
            page,
            totalPages: Math.ceil(entries.total / limit),
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
    }
}
