import { Product } from '@/context/productsContext';
import { createClient } from 'contentful';

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN!,
    environment: process.env.CONTENTFUL_ENVIRONMENT_ID || 'master',
});

// Helper function to map Contentful entry to Product
export const mapContentfulEntryToProduct = (item: any): Product => ({
    id: item.sys?.id || '',
    name: item.fields?.title || '',
    price: item.fields?.price || 0,
    stock: item.fields?.inStock || 0,
    description: item.fields?.description || '',
    imageUrl: item.fields?.image?.fields?.file?.url
        ? `https:${item.fields.image.fields.file.url}`
        : undefined,
    category: item.fields?.category?.sys?.id || '',
    brands: item.fields?.brands?.sys?.id || '',
    type: item.fields?.type || '',
    discount: item.fields?.discount || 0,
    rating: item.fields?.rating || 0,
    categoryName: item.fields?.category?.fields?.name || '',
    excerpt: item.fields?.excerpt || '',
    brandName: item.fields?.brands?.fields?.name || '',
    slug: item.fields?.slug || '',
});

 

export const fetchProductSlugs = async () => {
    try {
        const entries = await client.getEntries({ content_type: 'products' });
        return entries.items.map((item) => item.fields.slug);
    } catch (error) {
        console.error('Error fetching product slugs:', error);
        throw error;
    }
};

export const getProductBySlugFromContentful = async (slug: string): Promise<Product | null> => {
    try {
        const entries = await client.getEntries({
            content_type: "products",
            "fields.slug": slug,
            limit: 1
        });

        if (!entries.items.length) return null;

        return mapContentfulEntryToProduct(entries.items[0]);
    } catch (error) {
        console.error("Error fetching product by slug:", error);
        return null;
    }
};

export default client;