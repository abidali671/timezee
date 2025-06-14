import { createClient } from 'contentful';

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN!,
    environment: process.env.CONTENTFUL_ENVIRONMENT_ID || 'master',
});

export const fetchAllProducts = async () => {
    try {
        const entries = await client.getEntries({ content_type: 'swissTime' });

        return entries.items.map((item) => ({
            id: item.sys.id,
            ...item.fields,
        }));
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};
export default client;
