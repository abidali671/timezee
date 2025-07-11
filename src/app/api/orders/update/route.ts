import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/contentfull/order';

export async function PUT(req: NextRequest) {
    try {
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
        }

        await updateOrderStatus(id, status);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update order status:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
