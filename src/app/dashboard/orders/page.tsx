'use client';
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

interface Order {
    id: string;
    customer: string;
    total: number;
    status: string;
    phone: string;
}

const statusOptions = ['pending', 'shipped', 'delivered'];

export default function ManageOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [statusToUpdate, setStatusToUpdate] = useState('');
    const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
    const dropdownRef = useRef(null);

    // Fetch orders
    const loadOrders = async () => {
        setLoading(true);
        const res = await fetch('/api/orders');
        const data = await res.json();
        setOrders(data);
        setLoading(false);
    };

    useEffect(() => {
        loadOrders();
    }, []);

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !(dropdownRef.current as any).contains(e.target)) {
                setDropdownOpenId(null);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleStatusUpdate = async () => {
        if (!selectedOrder) return;
        try {
            await fetch('/api/orders/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: selectedOrder.id, status: statusToUpdate }),
            });
            setSelectedOrder(null);
            toast.success('Order status updated successfully!');
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status.');

        }
        await loadOrders();
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/orders/delete?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
            toast.success('Order deleted successfully!');
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed to delete order.');
        }

        await loadOrders();
    };

    return (
        <div className="p-0 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="w-full overflow-x-auto">

                    <table className="min-w-full bg-white border shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4">Order ID</th>
                                <th className="py-2 px-4">Customer</th>
                                <th className="py-2 px-4">Phone</th>
                                <th className="py-2 px-4">Total</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-t text-center">
                                    <td className="py-2 px-4">{order.id}</td>
                                    <td className="py-2 px-4">{order.customer}</td>
                                    <td className="py-2 px-4">{order.phone}</td>
                                    <td className="py-2 px-4">{order.total}</td>
                                    <td className="py-2 px-4">{order.status}</td>
                                    <td className="py-2 px-4 relative">
                                        <button
                                            className="text-black hover:text-black focus:outline-none cursor-pointer h-10 w-10 bg-gray-50 rounded-full"
                                            onClick={() => setDropdownOpenId(dropdownOpenId === order.id ? null : order.id)}
                                        >
                                            ⋮
                                        </button>

                                        {dropdownOpenId === order.id && (
                                            <div
                                                ref={dropdownRef}
                                                className="absolute bg-white border shadow-md rounded mt-2 right-0 z-10 w-40"
                                            >
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setStatusToUpdate(order.status);
                                                        setDropdownOpenId(null);
                                                    }}
                                                    className="block w-full px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                                                >
                                                    Edit Status
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(order.id)}
                                                    className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer text-left"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Status Edit Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>
                        <select
                            value={statusToUpdate}
                            onChange={(e) => setStatusToUpdate(e.target.value)}
                            className="w-full border px-3 py-2 rounded mb-4"
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleStatusUpdate}
                                className="px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-800"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

