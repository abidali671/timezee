'use client';
import { CartItem } from '@/context/CartContext';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

interface Order {
    products: any;
    id: string;
    customer: string;
    total: number;
    status: string;
    phone: string;
    address: string;
    country: string;
    state: string;
    orderDate?: string | null;
}

const statusOptions = ['pending', 'shipped', 'delivered'];

export default function ManageOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
    const [viewProductsOrder, setViewProductsOrder] = useState<Order | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [status, setStatus] = useState('');
    // Fetch orders
    const loadOrders = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page: String(page),
                limit: String(limit),
            });

            if (status) {
                query.append('status', status); 
            }

            const res = await fetch(`/api/orders?${query.toString()}`);
            const data = await res.json();
            setOrders(data.items);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            toast.error('Failed to load orders');
        }
        setLoading(false);
    };


    useEffect(() => {
        loadOrders();
    }, [page, limit, status]);

    const wrapperRef = useRef<HTMLTableCellElement | null>(null);
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setDropdownOpenId(null);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleUpdate = async () => {
        if (!selectedOrder) return;

        try {
            const res = await fetch('/api/orders/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedOrder),
            });
            if (!res.ok) throw new Error('Update failed');

            toast.success('Order updated successfully!');
            setSelectedOrder(null);
            await loadOrders();
        } catch {
            toast.error('Failed to update order.');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/orders/delete?id=${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Delete failed');
            toast.success('Order deleted successfully!');
            await loadOrders();
        } catch {
            toast.error('Failed to delete order.');
        }
    };
    console.log(status, 'order');


    return (
        <div className="p-0 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>

            {loading && orders.length === 0 ? (
                <div>Loading...</div>
            ) : (
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full bg-white border shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4">Customer</th>
                                <th className="py-2 px-4">Address</th>
                                <th className="py-2 px-4">Phone</th>
                                <th className="py-2 px-4">Total</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-t text-center">
                                    <td className="py-2 px-4">{order.customer}</td>
                                    <td className="py-2 px-4 w-32">{order.address}, {order.state}</td>
                                    <td className="py-2 px-4">{order.phone}</td>
                                    <td className="py-2 px-4">{order.total}</td>
                                    <td className="py-2 px-4">{order.status}</td>
                                    <td className="py-2 px-4 relative"  >
                                        <button
                                            className="text-black hover:text-black focus:outline-none cursor-pointer h-10 w-10 bg-gray-50 rounded-full"
                                            onClick={() => setDropdownOpenId(dropdownOpenId === order.id ? null : order.id)}
                                        >
                                            ⋮
                                        </button>


                                    </td>
                                    <td>  {dropdownOpenId === order.id && (
                                        <div className="absolute bg-white border shadow-md rounded mt-6 right-12 z-30 w-40">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setDropdownOpenId(null);
                                                }}
                                                className="block w-full px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                                            >
                                                Edit Order
                                            </button>
                                            <button
                                                onClick={() => setViewProductsOrder(order)}
                                                className="block w-full px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"

                                            >
                                                View Products
                                            </button>
                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer text-left"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className='flex gap-x-2 items-center mt-4 justify-end '>
                <select className='bg-white shadow py-2 px-2 w-20' onChange={(e) => setLimit(Number(e.target.value))} value={limit}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
                <select className='bg-white shadow py-2 px-2 w-20' onChange={(e) => {
                    setPage(1);
                    setStatus(e.target.value);
                }} value={status}>
                    <option value=''>All</option>
                    {statusOptions.map((value, id) => (
                        <option key={id} value={value} >{value}</option>
                    ))}
                </select>
                <div className='flex  items-center  space-x-2'>
                    <button
                        className='w-20 bg-white shadow cursor-pointer py-2 disabled:opacity-50'
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span>{page}</span>
                    <button
                        className='w-20 bg-white shadow cursor-pointer py-2 disabled:opacity-50'
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
            {/* Edit Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-20 p-4">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-auto">
                        <h3 className="text-lg font-semibold mb-4">Edit Order</h3>

                        <label className="block mb-3">
                            Customer Name
                            <input
                                type="text"
                                value={selectedOrder.customer}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, customer: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </label>

                        <label className="block mb-3">
                            Phone
                            <input
                                type="text"
                                value={selectedOrder.phone}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, phone: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </label>

                        <label className="block mb-3">
                            Address
                            <input
                                type="text"
                                value={selectedOrder.address}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, address: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </label>

                        <label className="block mb-3">
                            State
                            <input
                                type="text"
                                value={selectedOrder.state}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, state: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </label>

                        <label className="block mb-3">
                            Country
                            <input
                                type="text"
                                value={selectedOrder.country}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, country: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </label>

                        <label className="block mb-3">
                            Status
                            <select
                                value={selectedOrder.status}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block mb-3">
                            Total
                            <input
                                type="number"
                                value={selectedOrder.total}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, total: Number(e.target.value) })}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </label>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-800"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {viewProductsOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded shadow-md max-w-lg w-full max-h-[90vh] overflow-auto">
                        <h3 className="text-xl !font-bold mb-4">Order Products</h3>
                        {viewProductsOrder.products.length > 0 ? (
                            <ul className="divide-y w-full overflow-y-auto max-h-80 scrollbar-hide">
                                {viewProductsOrder.products.map((p: CartItem, idx: number) => (
                                    <>
                                        <li key={idx} className="py-2 flex justify-between items-center">
                                            <Image width={50} height={50} alt={p.name} src={p.imageUrl as string} />
                                            <span className="font-bold">{p.name}</span>
                                            <span className='font-bold'>Qty: {p.quantity}</span>
                                            <span className='font-bold'>Price: {p.price}</span>
                                        </li>

                                    </>
                                ))}

                            </ul>
                        ) : (
                            <p>No products found in this order.</p>
                        )}
                        <div className="text-right mt-4">
                            <button
                                onClick={() => setViewProductsOrder(null)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
