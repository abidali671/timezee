import { createClient } from 'contentful-management'
import { htmlToContentfulRichText } from '../../utils/contentful-utils';

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN!

const client = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
})

const sanitizeProductData = (productData: any) => ({
    ...productData,
    price: Number(productData.price),
    stock: Number(productData.stock),
    discount: Number(productData.discount || 0),
    rating: Math.round(Number(productData.rating || 1))
})

export async function fetchAllBrands() {
    try {
        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment('master');
        const entries = await environment.getEntries({
            content_type: 'brands',
            limit: 1000
        });
        return entries.items;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw error;
    }
}

export async function fetchAllCategories() {
    try {
        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment('master');
        const entries = await environment.getEntries({
            content_type: 'categories',
            limit: 1000
        });
        return entries.items;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw error;
    }
}

export async function createContentfulProduct(productData: any, imageFile: File | null) {
    try {
        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment('master');

        const sanitizedData = sanitizeProductData(productData);

        if (!sanitizedData.brands) {
            throw new Error('Brand is required for product creation');
        }

        // Validate Brand exists
        const brandEntry = await environment.getEntry(sanitizedData.brands);
        if (!brandEntry) {
            throw new Error(`Brand with ID ${sanitizedData.brands} not found`);
        }

        let assetId: string | null = null;

        // Upload image if provided
        if (imageFile) {
            const fileBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as ArrayBuffer);
                reader.onerror = reject;
                reader.readAsArrayBuffer(imageFile);
            });

            const asset = await environment.createAssetFromFiles({
                fields: {
                    title: { 'en-US': sanitizedData.name },
                    description: { 'en-US': `Image for ${sanitizedData.name}` },
                    file: {
                        'en-US': {
                            contentType: imageFile.type,
                            fileName: imageFile.name,
                            file: fileBuffer,
                        },
                    },
                },
            });

            const processedAsset = await asset.processForAllLocales();
            await processedAsset.publish();
            assetId = processedAsset.sys.id;
        }
        const richDescription = htmlToContentfulRichText(sanitizedData.description);


        // Build entry fields
        const entryFields: any = {
            title: { 'en-US': sanitizedData.name },
            excerpt: { 'en-US': sanitizedData.excerpt },
            slug: { 'en-US': sanitizedData.slug },
            price: { 'en-US': sanitizedData.price },
            discount: { 'en-US': sanitizedData.discount },
            rating: { 'en-US': sanitizedData.rating },
            inStock: { 'en-US': sanitizedData.stock },
            description: { 'en-US': richDescription },
            type: { 'en-US': sanitizedData.type || 'auto' },
            brands: {
                'en-US': {
                    sys: {
                        type: 'Link',
                        linkType: 'Entry',
                        id: sanitizedData.brands,
                    },
                },
            },
            category: {
                'en-US': {
                    sys: {
                        type: 'Link',
                        linkType: 'Entry',
                        id: sanitizedData.category,
                    },
                },
            },
        };

        if (assetId) {
            entryFields.image = {
                'en-US': {
                    sys: {
                        type: 'Link',
                        linkType: 'Asset',
                        id: assetId,
                    },
                },
            };
        }

        const entry = await environment.createEntry('products', {
            fields: entryFields,
        });

        await entry.publish();

        return {
            id: entry.sys.id,
            name: entry.fields.title['en-US'],
            price: entry.fields.price['en-US'],
            stock: entry.fields.inStock['en-US'],
            description: entry.fields.description['en-US'],
            imageUrl: assetId
                ? `https://images.ctfassets.net/${CONTENTFUL_SPACE_ID}/${assetId}`
                : '',
            category: sanitizedData.category,
            type: entry.fields.type?.['en-US'] || 'auto',
            discount: entry.fields.discount?.['en-US'] || 0,
            rating: entry.fields.rating?.['en-US'] || 1,
            brandId: sanitizedData.brands,
        };
    } catch (error) {
        console.error('Error creating Contentful product:', error);
        throw error;
    }
}
export const updateContentfulProduct = async (
    id: string,
    productData: any,
    imageFile?: File | null
) => {
    try {
        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment('master');

        console.log('Attempting to update product with ID:', id);

        // Retrieve the existing entry
        const entry = await environment.getEntry(id);
        if (!entry) {
            throw new Error(`Entry with id ${id} not found`);
        }

        const sanitizedData = sanitizeProductData(productData);

        // Ensure brand exists
        if (!sanitizedData.brands) {
            throw new Error('Brand is required to update the product');
        }

        const brandEntry = await environment.getEntry(sanitizedData.brands);
        if (!brandEntry) {
            throw new Error(`Brand with ID ${sanitizedData.brands} not found`);
        }

        // Optional: upload new image
        let assetId = entry.fields.image?.['en-US']?.sys?.id;
        if (imageFile) {
            const fileBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as ArrayBuffer);
                reader.onerror = reject;
                reader.readAsArrayBuffer(imageFile);
            });

            const asset = await environment.createAssetFromFiles({
                fields: {
                    title: { 'en-US': sanitizedData.name },
                    description: { 'en-US': `Updated image for ${sanitizedData.name}` },
                    file: {
                        'en-US': {
                            contentType: imageFile.type,
                            fileName: imageFile.name,
                            file: fileBuffer,
                        },
                    },
                },
            });

            const processedAsset = await asset.processForAllLocales();
            await processedAsset.publish();
            assetId = processedAsset.sys.id;
        }
        const richDescription = htmlToContentfulRichText(sanitizedData.description);

        entry.fields.description = {
            'en-US': richDescription,
        };
        // Update product fields
        entry.fields.title['en-US'] = sanitizedData.name;
        entry.fields.slug['en-US'] = sanitizedData.slug;
        entry.fields.price['en-US'] = sanitizedData.price;
        entry.fields.discount['en-US'] = sanitizedData.discount;
        entry.fields.rating['en-US'] = sanitizedData.rating;
        entry.fields.inStock['en-US'] = sanitizedData.stock;
        entry.fields.description['en-US'] = richDescription;
        entry.fields.type['en-US'] = sanitizedData.type;
        entry.fields.excerpt['en-US'] = sanitizedData.excerpt;

        // Update brand reference
        entry.fields.brands = {
            'en-US': {
                sys: {
                    type: 'Link',
                    linkType: 'Entry',
                    id: sanitizedData.brands,
                },
            },
        };
        entry.fields.category = {
            'en-US': {
                sys: {
                    type: 'Link',
                    linkType: 'Entry',
                    id: sanitizedData.category,
                },
            },
        };
        // Update image if needed
        if (assetId) {
            entry.fields.image = {
                'en-US': {
                    sys: {
                        type: 'Link',
                        linkType: 'Asset',
                        id: assetId,
                    },
                },
            };
        }

        // Save + publish
        const updatedEntry = await entry.update();
        const publishedEntry = await updatedEntry.publish();

        return {
            id: publishedEntry.sys.id,
            name: publishedEntry.fields.title['en-US'],
            price: publishedEntry.fields.price['en-US'],
            stock: publishedEntry.fields.inStock['en-US'],
            description: publishedEntry.fields.description['en-US'],
            imageUrl: assetId
                ? `https://images.ctfassets.net/${CONTENTFUL_SPACE_ID}/${assetId}`
                : productData.imageUrl,
            category: sanitizedData.category,
            brandId: sanitizedData.brands,
            type: publishedEntry.fields.type?.['en-US'] || 'auto',
            discount: publishedEntry.fields.discount?.['en-US'] || 0,
            rating: publishedEntry.fields.rating?.['en-US'] || 1,
        };
    } catch (error) {
        console.error('Error updating Contentful product:', error);
        throw error;
    }
};

export const deleteContentfulProduct = async (id: string) => {
    try {
        const space = await client.getSpace(CONTENTFUL_SPACE_ID)
        const environment = await space.getEnvironment('master')
        const entry = await environment.getEntry(id)

        if (entry.isPublished()) {
            await entry.unpublish()
        }

        await entry.delete()
    } catch (error) {
        console.error('Error deleting Contentful product:', error)
        throw error
    }
}