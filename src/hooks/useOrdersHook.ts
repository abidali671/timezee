import { useEffect, useState } from 'react';

type Order = {
    id: string;
    customer: string;
    total: number;
    status: string;
    phone: number;
    address: string;
    state: string;
    orderDate: string
    // You can expand this to include more fields as needed
};

type ChartDataPoint = {
    date: string;
    totalRevenue: number;
    orderCount: number;
};

type UseOrdersResult = {
    orders: Order[];
    totalRevenue: number;
    totalOrders: number;
    totalProfit: number;
    chartData: ChartDataPoint[];
    loading: boolean;
    error: string | null;
};

export function useOrdersHook(): UseOrdersResult {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders');
                if (!res.ok) throw new Error('Failed to fetch orders');
                const data = await res.json();

                setOrders(data.items || []);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || 'Unknown error');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;

    // Example: 20% profit margin
    const totalProfit = totalRevenue * 0.2;

    const grouped = orders.reduce<Record<string, { total: number; count: number }>>((acc, order) => {
        if (!order.orderDate) return acc;

        const date = new Date(order.orderDate).toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = { total: 0, count: 0 };
        }
        acc[date].total += order.total;
        acc[date].count += 1;

        return acc;
    }, {});


    const chartData: ChartDataPoint[] = Object.entries(grouped).map(([date, data]) => ({
        date,
        totalRevenue: data.total,
        orderCount: data.count,
    }));
    console.log(chartData, 'grope===');

    return {
        orders,
        totalRevenue,
        totalOrders,
        totalProfit,
        chartData,
        loading,
        error,
    };
}
