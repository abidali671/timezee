import { createClient } from 'contentful-management';

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN!;

const client = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN
});

export async function createOrderInContentful(orderData: {
    customerName: string;
    customerEmail: string;
    customerPhoneNumber: string;
    products: string[];
    price: number;
    status?: string;
    orderDate?: string;
}) {
    try {
        // Validate required fields
        if (!orderData.customerName || !orderData.customerEmail || !orderData.customerPhoneNumber) {
            throw new Error('Missing required customer information');
        }

        if (!orderData.products || orderData.products.length === 0) {
            throw new Error('At least one product is required');
        }

        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment('master');

        const productReferences = await Promise.all(
            orderData.products.map(async (productId) => {
                try {
                    // Verify each product exists
                    const product = await environment.getEntry(productId);
                    return {
                        sys: {
                            type: 'Link',
                            linkType: 'Entry',
                            id: product.sys.id
                        }
                    };
                } catch (error) {
                    console.error(`Product ${productId} not found`);
                    throw new Error(`Product ${productId} does not exist`);
                }
            })
        );

        const entryFields = {
            fields: {
                price: {
                    'en-US': Math.round(Number(orderData.price))
                },
                customerName: {
                    'en-US': String(orderData.customerName)
                },
                customerEmail: {
                    'en-US': String(orderData.customerEmail)
                },
                customerPhoneNumber: {
                    'en-US': parseInt(String(orderData.customerPhoneNumber).replace(/\D/g, '')) || 0
                },
                products: {
                    'en-US': productReferences
                },
                status: {
                    'en-US': orderData.status || 'pending'
                },
                orderDate: {
                    'en-US': orderData.orderDate || new Date().toISOString()
                }
            }
        };


        const entry = await environment.createEntry('orders', entryFields);
        await entry.publish();

        return {
            id: entry.sys.id,
            ...orderData,
            success: true
        };

    } catch (error) {
        console.error('Full error details:', error);
        throw error;
    }
}