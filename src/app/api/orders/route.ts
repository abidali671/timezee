import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/contentfull/order';
import { getEnvironment } from '@/lib/contentful-services';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status') || '';

        const skip = (page - 1) * limit;

        const env = await getEnvironment();

        const contentfulQuery: any = {
            content_type: 'orders',
            include: 2,
            limit,
            skip,
            order: '-sys.createdAt',
        };

        // ✅ Optional status filter
        if (status) {
            contentfulQuery['fields.status'] = status;
        }

        const entries = await env.getEntries(contentfulQuery);

        const items = await Promise.all(
            entries.items.map(async (entry: any) => {
                const pqRefs = entry.fields.productQuantities?.['en-US'] || [];

                const products = await Promise.all(
                    pqRefs.map(async (pqRef: any) => {
                        try {
                            const pqEntry = await env.getEntry(pqRef.sys.id);
                            const productRef = pqEntry.fields.product?.['en-US'];
                            const quantity = pqEntry.fields.quantity?.['en-US'];

                            if (!productRef || quantity == null) return null;

                            const product = await getProductById(productRef.sys.id);

                            return {
                                ...product,
                                quantity,
                            };
                        } catch (error) {
                            console.error(`Failed to fetch productWithQuantity ${pqRef.sys.id}:`, error);
                            return null;
                        }
                    })
                );

                return {
                    id: entry.sys.id,
                    customer: entry.fields.customerName?.['en-US'] || '',
                    total: entry.fields.price?.['en-US'] || 0,
                    status: entry.fields.status?.['en-US'] || 'pending',
                    phone: entry.fields.customerPhoneNumber?.['en-US'] || '',
                    address: entry.fields.address?.['en-US'] || '',
                    country: entry.fields.country?.['en-US'] || '',
                    state: entry.fields.state?.['en-US'] || '',
                    orderDate: entry.fields.orderDate?.['en-US'] || null,
                    products: products.filter(Boolean),
                };
            })
        );

        const totalPages = Math.ceil(entries.total / limit);

        return NextResponse.json({
            items,
            total: entries.total,
            totalPages,
        });
    } catch (err) {
        console.error('Fetch orders error:', err);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
