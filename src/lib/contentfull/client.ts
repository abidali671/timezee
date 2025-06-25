import { createClient } from 'contentful';

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN!,
    environment: process.env.CONTENTFUL_ENVIRONMENT_ID || 'master',
});

export const fetchAllProducts = async () => {
    try {
        const entries = await client.getEntries({ content_type: 'products' });
        return entries.items;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};
export const fetchProductSlugs = async () => {
    try {
        const entries = await client.getEntries({ content_type: 'products' });
        return entries.items.map((item) => item.fields.slug);
    } catch (error) {
        console.error('Error fetching product slugs:', error);
        throw error;
    }
};
export const getProductBySlugFromContentful = async (slug: string) => {
    try {
        const entries = await client.getEntries({
            content_type: "products",
            "fields.slug": slug,
        });

        if (!entries.items.length) return null;

        return entries.items[0].fields;
    } catch (error) {
        console.error("Error fetching product by slug:", error);
        return null;
    }
};
export default client;
