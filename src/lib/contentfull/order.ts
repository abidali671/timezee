import { createClient } from 'contentful-management';

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN!;

const client = createClient({ accessToken: CONTENTFUL_MANAGEMENT_TOKEN });

export async function createOrderInContentful(orderData: {
    customerName: string;
    customerEmail: string;
    customerPhoneNumber: string;
    products: { id: string; quantity: number }[];
    price: number;
    status?: string;
    orderDate?: string;
}) {
    try {
        if (!orderData.customerName || !orderData.customerEmail || !orderData.customerPhoneNumber) {
            throw new Error('Missing required customer information');
        }

        if (!orderData.products || orderData.products.length === 0) {
            throw new Error('At least one product is required');
        }

        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment('master');

        // Prepare product references and update stock
        const productReferences = await Promise.all(orderData.products.map(async ({ id, quantity }) => {
            const product = await environment.getEntry(id);
            const currentStock = product.fields.inStock?.['en-US'] || 0;
            const newStock = Math.max(currentStock - quantity, 0);

            product.fields.inStock = { 'en-US': newStock };

            const updatedProduct = await product.update();
            await updatedProduct.publish();

            return {
                sys: {
                    type: 'Link',
                    linkType: 'Entry',
                    id: id
                }
            };
        }));

        const orderEntry = await environment.createEntry('orders', {
            fields: {
                customerName: { 'en-US': orderData.customerName },
                customerEmail: { 'en-US': orderData.customerEmail },
                customerPhoneNumber: { 'en-US': parseInt(orderData.customerPhoneNumber.replace(/\D/g, '')) || 0 },
                price: { 'en-US': Math.round(orderData.price) },
                products: { 'en-US': productReferences },
                status: { 'en-US': orderData.status || 'pending' },
                orderDate: { 'en-US': orderData.orderDate || new Date().toISOString() }
            }
        });

        await orderEntry.publish();

        return {
            id: orderEntry.sys.id,
            success: true
        };
    } catch (error) {
        console.error('Order creation or stock update failed:', error);
        throw error;
    }
}
