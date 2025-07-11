import { createClient } from 'contentful-management';

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN!;

const client = createClient({ accessToken: CONTENTFUL_MANAGEMENT_TOKEN });

export async function createOrderInContentful(orderData: {
    customerName: string;
    customerEmail: string;
    customerPhoneNumber: string;
    country: string;
    state: string;
    address: string;
    products: { id: string; quantity: number }[];
    price: number;
    status?: string;
    orderDate?: string;
}) {
    try {
        // Validation
        if (
            !orderData.customerName ||
            !orderData.customerEmail ||
            !orderData.customerPhoneNumber ||
            !orderData.country ||
            !orderData.state ||
            !orderData.address
        ) {
            throw new Error('Missing required customer or address information');
        }
        if (!orderData.products?.length) {
            throw new Error('At least one product is required');
        }

        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment('master');

        // Update product stock and build references
        const productReferences = await Promise.all(
            orderData.products.map(async ({ id, quantity }) => {
                const product = await environment.getEntry(id);
                const currentStock = product.fields.inStock?.['en-US'] || 0;
                product.fields.inStock = { 'en-US': Math.max(currentStock - quantity, 0) };
                const updated = await product.update();
                await updated.publish();
                return {
                    sys: { type: 'Link', linkType: 'Entry', id }
                };
            })
        );

        // Create order entry with full fields
        const orderEntry = await environment.createEntry('orders', {
            fields: {
                customerName: { 'en-US': orderData.customerName },
                customerEmail: { 'en-US': orderData.customerEmail },
                customerPhoneNumber: { 'en-US': parseInt(orderData.customerPhoneNumber.replace(/\D/g, '')) || 0 },
                country: { 'en-US': orderData.country },
                state: { 'en-US': orderData.state },
                address: { 'en-US': orderData.address },
                products: { 'en-US': productReferences },
                price: { 'en-US': Math.round(orderData.price) },
                status: { 'en-US': orderData.status || 'pending' },
                orderDate: { 'en-US': orderData.orderDate || new Date().toISOString() },
            }
        });

        await orderEntry.publish();

        // Return the new entry ID
        return {
            id: orderEntry.sys.id,
            success: true
        };
    } catch (error) {
        console.error('Order creation or stock update failed:', error);
        throw error;
    }
}

const getEnvironment = async () => {
    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    return space.getEnvironment('master');
};
export const fetchOrders = async () => {
    const env = await getEnvironment();
    const entries = await env.getEntries({ content_type: 'orders' });
    return entries.items.map((entry) => ({
        id: entry.sys.id,
        customer: entry.fields.customerName['en-US'],
        total: entry.fields.price['en-US'],
        status: entry.fields.status['en-US'],
        phone: entry.fields.customerPhoneNumber['en-US'],
    }));
};

export const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const env = await getEnvironment();
    const order = await env.getEntry(orderId);
    order.fields.status['en-US'] = newStatus;
    const updated = await order.update();
    await updated.publish();
    return true;
};

export const deleteOrder = async (orderId: string) => {
    const env = await getEnvironment();
    const entry = await env.getEntry(orderId);
    await entry.unpublish().catch(() => null); // In case already unpublished
    await entry.delete();
    return true;
};
