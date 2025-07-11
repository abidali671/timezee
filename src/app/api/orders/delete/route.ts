// app/api/orders/delete/route.ts
import { deleteOrder } from '@/lib/contentfull/order';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
        }

        await deleteOrder(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete failed:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}
