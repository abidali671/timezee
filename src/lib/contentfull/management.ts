
import { htmlToContentfulRichText } from '@/utils/contentful-utils';
import {
    getEnvironment,
    sanitizeProductData,
    buildEntryFields,
    uploadImageAsset,
} from '@/lib/contentful-services'
import { Product } from '@/context/productsContext';
const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;

export async function fetchAllBrands() {
    const environment = await getEnvironment();
    const entries = await environment.getEntries({ content_type: 'brands', limit: 1000 });
    return entries.items;
}

export async function fetchAllCategories() {
    const environment = await getEnvironment();
    const entries = await environment.getEntries({ content_type: 'categories', limit: 1000 });
    return entries.items;
}


export async function createContentfulProduct(productData: Product, imageFile: File | null) {
    const environment = await getEnvironment();
    const data = sanitizeProductData(productData);

    const brandEntry = await environment.getEntry(data.brands);
    if (!brandEntry) throw new Error(`Brand with ID ${data.brands} not found`);

    let assetId: string | undefined;
    // Only upload if imageFile is a File instance
    if (imageFile && imageFile instanceof File) {
        assetId = await uploadImageAsset(environment, imageFile, data.name);
    }
    const richDescription = htmlToContentfulRichText(data.description);
    console.log('Creating product with data:', data, 'and assetId:', assetId);
    console.log('Rich description:', richDescription);

    const entry = await environment.createEntry('products', {
        fields: buildEntryFields(data, richDescription, assetId),
    });

    await entry.publish();

    return {
        id: entry.sys.id,
        name: data.name,
        imageUrl: assetId
            ? `https://images.ctfassets.net/${CONTENTFUL_SPACE_ID}/${assetId}`
            : '',
        ...data,
    };
}

export async function updateContentfulProduct(id: string, productData: Product, imageFile?: File | null) {
    const environment = await getEnvironment();
    const entry = await environment.getEntry(id);
    const data = sanitizeProductData(productData);

    const brandEntry = await environment.getEntry(data.brands);
    if (!brandEntry) throw new Error(`Brand with ID ${data.brands} not found`);

    let assetId = entry.fields.image?.['en-US']?.sys?.id;
    // Upload new image only if imageFile is a File
    if (imageFile && imageFile instanceof File) {
        assetId = await uploadImageAsset(environment, imageFile, data.name);
    }

    const richDescription = htmlToContentfulRichText(data.description);
    entry.fields = buildEntryFields(data, richDescription, assetId);

    const updated = await entry.update();
    const published = await updated.publish();

    return {
        id: published.sys.id,
        name: data.name,
        imageUrl: assetId
            ? `https://images.ctfassets.net/${CONTENTFUL_SPACE_ID}/${assetId}`
            : data.imageUrl,
        ...data,
    };
}

export async function duplicateContentfulProduct(productId: string) {
    const environment = await getEnvironment();
    const original = await environment.getEntry(productId);
    const fields = original.fields;
    const locale = 'en-US';
    const clean = (str: string) => str.replace(/\s*\(Copy(?: \d+)?\)$/i, '').replace(/-copy(?:-\d+)?$/i, '');

    const newName = `${clean(fields.title?.[locale] || 'Unnamed Product')} (Copy ${Math.floor(Math.random() * 10000)})`;
    const newSlug = `${clean(fields.slug?.[locale] || 'unnamed-product')}-copy-${Math.floor(Math.random() * 10000)}`;

    const newFields: any = {
        ...fields,
        title: { [locale]: newName },
        slug: { [locale]: newSlug },
    };

    if (fields.image?.[locale]?.sys?.id) {
        try {
            const asset = await environment.getAsset(fields.image[locale].sys.id);
            if (asset?.sys?.publishedVersion) {
                newFields.image = { [locale]: { sys: { type: 'Link', linkType: 'Asset', id: fields.image[locale].sys.id } } };
            }
        } catch (err) {
            console.log(err)
        }
    }

    const newEntry = await environment.createEntry('products', { fields: newFields });
    await newEntry.publish();

    return {
        id: newEntry.sys.id,
        slug:newEntry.fields.slug[locale],
        name: newName,
        price: newEntry.fields.price[locale],
        stock: newEntry.fields.inStock[locale],
        imageUrl: newEntry.fields.image?.[locale]
            ? `https://images.ctfassets.net/${CONTENTFUL_SPACE_ID}/${newEntry.fields.image[locale].sys.id}`
            : '',
        description: newEntry.fields.description[locale],
        rating: newEntry.fields.rating?.[locale] || 1,
        discount: newEntry.fields.discount?.[locale] || 0,
        category: newEntry.fields.category?.[locale]?.sys?.id,
        type: newEntry.fields.type?.[locale] || 'auto',
        brandId: newEntry.fields.brands?.[locale]?.sys?.id,
        brandName: newEntry.fields.brands?.[locale]?.fields?.name || 'Unknown',
        excerpt: newEntry.fields.excerpt?.[locale] || '',
    };
}

export async function deleteContentfulProduct(id: string) {
    const environment = await getEnvironment();
    const entry = await environment.getEntry(id);

    if (entry.isPublished()) await entry.unpublish();
    await entry.delete();
}
