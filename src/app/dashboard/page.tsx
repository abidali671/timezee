'use client'
import { useProducts } from '@/context/productsContext';
import { Line } from 'react-chartjs-2';
import { useOrdersHook } from '../../hooks/useOrdersHook';
import { Boxes, ChartNoAxesColumn, PackageCheck } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardHome() {
    const { products } = useProducts();
    const { totalOrders, totalRevenue, totalProfit, loading, chartData } = useOrdersHook();
    if (loading) return <div>Loading...</div>;
    const chartConfig = {
        labels: chartData.map((d) => d.date),
        datasets: [
            {
                label: 'Revenue',
                data: chartData.map((d) => d.totalRevenue),
                borderColor: 'green',
                fill: false,
            },
            {
                label: 'Orders',
                data: chartData.map((d) => d.orderCount),
                borderColor: 'blue',
                fill: false,
            },
        ],
    };


    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800"> Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className='flex gap-x-3'>
                        <Boxes />
                        <h3 className="text-2xl font-bold text-gray-700">Total Products</h3>
                    </div>

                    <p className="text-2xl text-gray-600">{products.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className='flex gap-x-3'>
                        <PackageCheck />
                        <h3 className="text-2xl font-bold text-gray-700">Total Orders</h3>

                    </div>
                    <p className="text-2xl text-gray-600">{totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className='flex gap-x-3'>
                        <ChartNoAxesColumn />
                        <h3 className="text-2xl font-bold text-gray-700">Revenue</h3>
                    </div>

                    <p className="text-2xl text-gray-600">PKR {totalRevenue}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-gray-700">% Profit</h3>
                    <p className="text-2xl text-gray-600">PKR {totalProfit}</p>
                </div>
            </div>
            <div className="chart-container w-6/12 bg-white p-6 rounded-lg shadow-md">
                <Line data={chartConfig} />
            </div>
        </div>
    );
}
