import { NextRequest, NextResponse } from 'next/server';
import { updateFullOrder } from '@/lib/contentfull/order';

export async function PUT(req: NextRequest) {
    try {
        const order = await req.json();
        if (!order.id) {
            return NextResponse.json({ error: 'Missing order id' }, { status: 400 });
        }
        await updateFullOrder(order);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
