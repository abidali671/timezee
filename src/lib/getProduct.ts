import client, { mapContentfulEntryToProduct } from '@/lib/contentfull/client';
import { Product } from '@/context/productsContext';

export async function getProducts({ page = 1, limit = 10, query = '' } = {}) {
    const skip = (page - 1) * limit;

    const contentfulQuery: any = {
        content_type: 'products',
        limit,
        skip,
    };

    if (query) {
        contentfulQuery['query'] = query;
    }

    const entries = await client.getEntries(contentfulQuery);
    const products: Product[] = entries.items.map(mapContentfulEntryToProduct);

    return {
        items: products,
        count: products.length,
        total: entries.total,
        page,
        totalPages: Math.ceil(entries.total / limit),
    };
}
