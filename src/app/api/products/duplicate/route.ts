import { NextRequest, NextResponse } from 'next/server';
import { duplicateContentfulProduct } from '@/lib/contentfull/management'; // Adjust path if necessary

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productId } = body;

        if (!productId || typeof productId !== 'string') {
            return NextResponse.json(
                { message: 'Missing or invalid productId in request body' },
                { status: 400 }
            );
        }

        const duplicatedProduct = await duplicateContentfulProduct(productId);

        return NextResponse.json({ data: duplicatedProduct }, { status: 201 }); // 201 Created for a new resource
    } catch (error) {
        console.error('API duplicate product error:', error);
        return NextResponse.json(
            {
                message: 'Failed to duplicate product',
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}