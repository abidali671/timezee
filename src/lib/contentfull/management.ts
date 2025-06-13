import { createClient } from 'contentful-management'

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN!

const client = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
})

export async function createContentfulProduct(productData: any, imageFile: File | null) {
    try {
        const space = await client.getSpace(CONTENTFUL_SPACE_ID)
        const environment = await space.getEnvironment('master')

        let assetId = null

        // Handle image upload first if exists
        if (imageFile) {
            const asset = await environment.createAssetFromFiles({
                fields: {
                    title: {
                        'en-US': productData.name,
                    },
                    description: {
                        'en-US': `Image for ${productData.name}`,
                    },
                    file: {
                        'en-US': {
                            contentType: imageFile.type,
                            fileName: imageFile.name,
                            file: await new Promise<ArrayBuffer>((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () => resolve(reader.result as ArrayBuffer);
                                reader.onerror = reject;
                                reader.readAsArrayBuffer(imageFile);
                            }),
                        },
                    },
                },
            })

            const processedAsset = await asset.processForAllLocales()
            await processedAsset.publish()
            assetId = processedAsset.sys.id
        }

        // Create the product entry
        const entryFields: any = {
            title: {
                'en-US': productData.name,
            },
            slug: {
                'en-US': productData.name.toLowerCase().replace(/\s+/g, '-'),
            },
            price: {
                'en-US': productData.price,
            },
            discount: {
                'en-US': productData.discount || 0,
            },
            rating: {
                'en-US': Math.round(productData.rating || 1),
            },
            category: {
                'en-US': productData.category || 'general',
            },
            brand: {
                'en-US': productData.brand || 'rado',
            },
            type: {
                'en-US': productData.type || 'auto',
            },
            availability: {
                'en-US': productData.stock,
            },
            description: {
                'en-US': productData.description,
            },
        }

        // Add image reference if uploaded
        if (assetId) {
            entryFields.image = {
                'en-US': {
                    sys: {
                        type: 'Link',
                        linkType: 'Asset',
                        id: assetId,
                    },
                },
            }
        }

        const entry = await environment.createEntry('swissTime', {
            fields: entryFields,
        })

        await entry.publish()
        return entry

    } catch (error) {
        console.error('Error creating Contentful product:', error)
        throw error
    }
}