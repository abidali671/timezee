
import { fetchOrders } from '@/lib/contentfull/order';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const orders = await fetchOrders();
        return NextResponse.json(orders);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
