import { createClient } from 'contentful-management'

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN!

const client = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
})

// Helper function to ensure numeric fields are proper numbers
const sanitizeProductData = (productData: any) => ({
    ...productData,
    price: Number(productData.price),
    stock: Number(productData.stock),
    discount: Number(productData.discount || 0),
    rating: Math.round(Number(productData.rating || 1))
})

export async function createContentfulProduct(productData: any, imageFile: File | null) {
    try {
        const space = await client.getSpace(CONTENTFUL_SPACE_ID)
        const environment = await space.getEnvironment('master')

        // Sanitize numeric fields
        const sanitizedData = sanitizeProductData(productData)
        let assetId = null

        // Handle image upload first if exists
        if (imageFile) {
            const asset = await environment.createAssetFromFiles({
                fields: {
                    title: { 'en-US': sanitizedData.name },
                    description: { 'en-US': `Image for ${sanitizedData.name}` },
                    file: {
                        'en-US': {
                            contentType: imageFile.type,
                            fileName: imageFile.name,
                            file: await new Promise<ArrayBuffer>((resolve, reject) => {
                                const reader = new FileReader()
                                reader.onload = () => resolve(reader.result as ArrayBuffer)
                                reader.onerror = reject
                                reader.readAsArrayBuffer(imageFile)
                            }),
                        },
                    },
                },
            })

            const processedAsset = await asset.processForAllLocales()
            await processedAsset.publish()
            assetId = processedAsset.sys.id
        }


        const entryFields: {
            title: { 'en-US': any },
            slug: { 'en-US': any },
            price: { 'en-US': any },
            discount: { 'en-US': any },
            rating: { 'en-US': any },
            category: { 'en-US': any },
            brand: { 'en-US': any },
            type: { 'en-US': any },
            availability: { 'en-US': any },
            description: { 'en-US': any },
            image?: { 'en-US': { sys: { type: string, linkType: string, id: string } } }
        } = {
            title: { 'en-US': sanitizedData.name },
            slug: { 'en-US': sanitizedData.slug },
            price: { 'en-US': sanitizedData.price },
            discount: { 'en-US': sanitizedData.discount },
            rating: { 'en-US': sanitizedData.rating },
            category: { 'en-US': sanitizedData.category || 'general' },
            brand: { 'en-US': sanitizedData.brand || 'rado' },
            type: { 'en-US': sanitizedData.type || 'auto' },
            availability: { 'en-US': sanitizedData.stock },
            description: { 'en-US': sanitizedData.description },
        }


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

        const entry = await environment.createEntry('swissTime', { fields: entryFields })
        await entry.publish()

        return {
            id: entry.sys.id,
            name: entry.fields.title['en-US'],
            price: entry.fields.price['en-US'],
            stock: entry.fields.availability['en-US'],
            description: entry.fields.description['en-US'],
            imageUrl: assetId ? `https:${entry.fields.image?.['en-US']?.fields?.file?.url}` : '',
            category: entry.fields.category?.['en-US'] || 'general',
            brand: entry.fields.brand?.['en-US'] || 'rado',
            type: entry.fields.type?.['en-US'] || 'auto',
            discount: entry.fields.discount?.['en-US'] || 0,
            rating: entry.fields.rating?.['en-US'] || 1,
        }

    } catch (error) {
        console.error('Error creating Contentful product:', error)
        throw error
    }
}

export const updateContentfulProduct = async (id: string, productData: any) => {
    try {
        const space = await client.getSpace(CONTENTFUL_SPACE_ID)
        const environment = await space.getEnvironment('master')
        const entry = await environment.getEntry(id)

        // Sanitize numeric fields
        const sanitizedData = sanitizeProductData(productData)

        // Update entry fields with properly typed numbers
        entry.fields.title['en-US'] = sanitizedData.name
        entry.fields.slug['en-US'] = sanitizedData.slug
        entry.fields.price['en-US'] = sanitizedData.price
        entry.fields.discount['en-US'] = sanitizedData.discount
        entry.fields.rating['en-US'] = sanitizedData.rating
        entry.fields.availability['en-US'] = sanitizedData.stock
        entry.fields.description['en-US'] = sanitizedData.description
        entry.fields.category['en-US'] = sanitizedData.category || 'general'
        entry.fields.brand['en-US'] = sanitizedData.brand || 'rado'
        entry.fields.type['en-US'] = sanitizedData.type || 'auto'

        const updatedEntry = await entry.update()
        const publishedEntry = await updatedEntry.publish()

        return {
            id: publishedEntry.sys.id,
            name: publishedEntry.fields.title['en-US'],
            price: publishedEntry.fields.price['en-US'],
            stock: publishedEntry.fields.availability['en-US'],
            description: publishedEntry.fields.description['en-US'],
            imageUrl: productData.imageUrl,
            category: publishedEntry.fields.category?.['en-US'] || 'general',
            brand: publishedEntry.fields.brand?.['en-US'] || 'rado',
            type: publishedEntry.fields.type?.['en-US'] || 'auto',
            discount: publishedEntry.fields.discount?.['en-US'] || 0,
            rating: publishedEntry.fields.rating?.['en-US'] || 1,
        }

    } catch (error) {
        console.error('Error updating Contentful product:', error)
        throw error
    }
}

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