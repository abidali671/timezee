// utils/contentful-utils.ts

import { createClient } from 'contentful-management'

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

export const uploadImageAsset = async (
    environment: any,
    imageFile: File,
    title: string
): Promise<string> => {
    const MAX_SIZE_MB = 10;

    if (imageFile.size > MAX_SIZE_MB * 1024 * 1024) {
        throw new Error(`Image exceeds ${MAX_SIZE_MB}MB limit`);
    }

    const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(imageFile);
    });

    const asset = await environment.createAssetFromFiles({
        fields: {
            title: { 'en-US': title },
            description: { 'en-US': `Image for ${title}` },
            file: {
                'en-US': {
                    contentType: imageFile.type,
                    fileName: imageFile.name,
                    file: buffer,
                },
            },
        },
    });

    const processedAsset = await asset.processForAllLocales();
    await processedAsset.publish();
    return processedAsset.sys.id;
};
 