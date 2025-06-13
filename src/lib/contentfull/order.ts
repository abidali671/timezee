// /lib/contentful/product.ts
import client from './client';

export const getAllProducts = async () => {
    const res = await client.getEntries({ content_type: 'swissTimeOrder' });
    return res.items;
};
