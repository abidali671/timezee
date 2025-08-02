import { NextRequest, NextResponse } from 'next/server';
import { updateContentfulProduct, deleteContentfulProduct } from '@/lib/contentfull/management';
import client, { mapContentfulEntryToProduct } from '@/lib/contentfull/client';
import { Product } from '@/context/productsContext';

// GET: Fetch a single product by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const entry = await client.getEntry(params.id);
        const product: Product = mapContentfulEntryToProduct(entry);

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
}

// PATCH: Update a product by ID

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formData = await req.formData();

        const jsonData = formData.get('data');
        const imageFileFromForm = formData.get('image'); // This will be a File (or Blob in Node.js) or null/undefined
        const removeImageFlag = formData.get('removeImage'); // This will be 'true' or null/undefined

        if (!jsonData || typeof jsonData !== 'string') {
            return NextResponse.json(
                { message: 'Missing product data' },
                { status: 400 }
            );
        }

        const productData: Product = JSON.parse(jsonData);

        let imageToPassToContentful: File | Blob | null | undefined;
        // undefined: no image change
        // File | Blob: new image provided
        // null: remove existing image

        if (removeImageFlag === 'true') {
            // Client explicitly requested to remove the image
            imageToPassToContentful = null;
        } else if (imageFileFromForm instanceof Blob) { // Check if a new file was uploaded
            // A new image (Blob/File) was provided.
            // Pass it directly to Contentful update function.
            imageToPassToContentful = imageFileFromForm;
        } else {
            // No new image provided, and no explicit removal flag.
            // Keep the current image in Contentful.
            imageToPassToContentful = undefined;
        }

        const updatedProduct = await updateContentfulProduct(params.id, productData, imageToPassToContentful);

        return NextResponse.json({ data: updatedProduct });
    } catch (error) {
        console.error('PATCH error:', error);
        return NextResponse.json(
            { message: 'Failed to update product', error: (error as Error).message },
            { status: 500 }
        );
    }
}

// DELETE: Delete a product by ID
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        if (!params.id) {
            return NextResponse.json(
                { message: 'Product ID is required' },
                { status: 400 }
            );
        }

        await deleteContentfulProduct(params.id);

        return NextResponse.json(
            { message: 'Product deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('DELETE error:', error);
        return NextResponse.json(
            { message: 'Failed to delete product', error: (error as Error).message },
            { status: 500 }
        );
    }
}