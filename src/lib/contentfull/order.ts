import { createClient } from 'contentful-management';

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN!;

const client = createClient({ accessToken: CONTENTFUL_MANAGEMENT_TOKEN });

interface OrderUpdate {
    id: string;
    customer: string;
    total: number;
    status: string;
    phone: string;
    address: string;
    country: string;
    state: string;
    orderDate?: string | null;
}


export const getProductById = async (productId: string) => {
    const env = await getEnvironment();
    const entry = await env.getEntry(productId);

    // Get the image asset ID from the link
    const imageAssetId = entry.fields.image?.['en-US']?.sys?.id;

    let imageUrl = '';
    if (imageAssetId) {
        // Fetch the actual asset
        const asset = await env.getAsset(imageAssetId);
        imageUrl = asset.fields.file?.['en-US']?.url || '';
    }

    return {
        id: entry.sys.id,
        name: entry.fields.title?.['en-US'] || 'Untitled Product',
        price: entry.fields.price?.['en-US'] || 0,
        stock: entry.fields.inStock?.['en-US'] || 0,
        imageUrl: imageUrl ? `https:${imageUrl}` : '',

    };
};

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
        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment('master');

        const productQuantityRefs = await Promise.all(
            orderData.products.map(async ({ id, quantity }) => {
                const productEntry = await environment.getEntry(id);

                // 1. Deduct stock
                const currentStock = productEntry.fields.inStock?.['en-US'] || 0;
                productEntry.fields.inStock = {
                    'en-US': Math.max(currentStock - quantity, 0),
                };
                const updatedProduct = await productEntry.update();
                await updatedProduct.publish();

                // 2. Create productWithQuantity entry
                const pqEntry = await environment.createEntry('productWithQuantity', {
                    fields: {
                        product: {
                            'en-US': {
                                sys: { type: 'Link', linkType: 'Entry', id },
                            },
                        },
                        quantity: {
                            'en-US': quantity,
                        },
                    },
                });
                await pqEntry.publish();

                // 3. Return ref
                return {
                    sys: { type: 'Link', linkType: 'Entry', id: pqEntry.sys.id },
                };
            })
        );

        // 4. Create order
        const orderEntry = await environment.createEntry('orders', {
            fields: {
                customerName: { 'en-US': orderData.customerName },
                customerEmail: { 'en-US': orderData.customerEmail },
                customerPhoneNumber: {
                    'en-US': parseInt(orderData.customerPhoneNumber.replace(/\D/g, '')) || 0,
                },
                country: { 'en-US': orderData.country || 'Pakistan' },
                state: { 'en-US': orderData.state },
                address: { 'en-US': orderData.address },
                productQuantities: { 'en-US': productQuantityRefs },
                price: { 'en-US': Math.round(orderData.price) },
                status: { 'en-US': orderData.status || 'pending' },
                orderDate: { 'en-US': orderData.orderDate || new Date().toISOString() },
            },
        });

        await orderEntry.publish();

        return {
            id: orderEntry.sys.id,
            success: true,
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

export async function updateFullOrder(order: OrderUpdate) {
    const env = await getEnvironment();
    const entry = await env.getEntry(order.id);

    // Update all fields in 'en-US' locale (adjust locale if needed)
    entry.fields.customerName = { 'en-US': order.customer };
    entry.fields.price = { 'en-US': order.total };
    entry.fields.status = { 'en-US': order.status };
    entry.fields.customerPhoneNumber = { 'en-US': order.phone };
    entry.fields.address = { 'en-US': order.address };
    entry.fields.country = { 'en-US': order.country };
    entry.fields.state = { 'en-US': order.state };
    if (order.orderDate) {
        entry.fields.orderDate = { 'en-US': order.orderDate };
    }

    const updated = await entry.update();
    await updated.publish();

    return true;
}
export const deleteOrder = async (orderId: string) => {
    const env = await getEnvironment();
    const entry = await env.getEntry(orderId);
    await entry.unpublish().catch(() => null); // In case already unpublished
    await entry.delete();
    return true;
};
