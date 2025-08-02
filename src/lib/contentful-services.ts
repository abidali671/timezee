
import { createClient, Environment } from 'contentful-management'

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN!;

export const contentfulClient = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
});

export const getEnvironment = async () => {
    const space = await contentfulClient.getSpace(CONTENTFUL_SPACE_ID);
    return space.getEnvironment('master');
};

export const sanitizeProductData = (productData: any) => ({
    ...productData,
    price: Number(productData.price),
    stock: Number(productData.stock),
    discount: Number(productData.discount || 0),
    rating: Math.round(Number(productData.rating || 1)),
});

export const buildEntryFields = (
    data: any,
    richDescription: any,
    assetId?: string
) => {
    const fields: any = {
        title: { 'en-US': data.name },
        excerpt: { 'en-US': data.excerpt },
        slug: { 'en-US': data.slug },
        price: { 'en-US': data.price },
        discount: { 'en-US': data.discount || 0 },
        rating: { 'en-US': Math.round(data.rating || 1) },
        inStock: { 'en-US': data.stock },
        description: { 'en-US': richDescription },
        type: { 'en-US': data.type || 'auto' },
        brands: {
            'en-US': {
                sys: { type: 'Link', linkType: 'Entry', id: data.brands },
            },
        },
        category: {
            'en-US': {
                sys: { type: 'Link', linkType: 'Entry', id: data.category },
            },
        },
    };

    if (assetId) {
        fields.image = {
            'en-US': {
                sys: { type: 'Link', linkType: 'Asset', id: assetId },
            },
        };
    }

    return fields;
};

export async function uploadImageAsset(environment: Environment, file: File | Blob, fileName: string): Promise<string> {
    try {
        // The structure for createAssetFromFiles is different.
        // It expects the 'file' property to be directly at the top level of 'fields',
        // and its value is the actual File/Blob object.
        const asset = await environment.createAssetFromFiles({
            fields: {
                // The 'file' property here refers to the actual File/Blob object
                file: {
                    'en-US': {
                        file: await file.arrayBuffer(), // Convert File/Blob to ArrayBuffer
                        contentType: file.type, // Extract content type from the File/Blob
                        fileName: fileName || 'untitled-image', // Use provided fileName or default
                    },
                },
                title: {
                    'en-US': fileName || 'Product Image', // Add a title for the asset
                },
                description: { // Optional: You can also add a description
                    'en-US': `Image for product: ${fileName}`,
                },
            },
            // The method might also support providing content type and filename here,
            // but providing it via the Blob's properties (file.type, file.name) is usually sufficient.
            // If the SDK needs explicit contentType and fileName, you might add them directly here
            // contentType: file.type, // Not usually needed if Blob provides it
            // fileName: fileName || 'untitled-image', // Not usually needed if Blob provides it
        });

        // Wait for the asset to be processed (uploaded to Contentful's CDN)
        const processedAsset = await asset.processForAllLocales();

        // Publish the asset to make it publicly accessible
        const publishedAsset = await processedAsset.publish();

        return publishedAsset.sys.id; // Return the ID of the new asset
    } catch (error) {
        console.error('Error uploading asset to Contentful:', error);
        // Provide more detailed error message
        throw new Error(`Failed to upload image asset: ${(error as Error).message}`);
    }
}
