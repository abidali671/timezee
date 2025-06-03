'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';

export default function ManageOrders() {
    const { orders, addOrder, updateOrder, removeOrder, loading } = useStore();

    const [formOrder, setFormOrder] = useState({ id: 0, customer: '', total: 0, status: 'Pending' });
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsPopoverOpen(false);
                setIsEditing(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openAddPopover = () => {
        setFormOrder({ id: 0, customer: '', total: 0, status: 'Pending' });
        setIsEditing(false);
        setIsPopoverOpen(true);
    };

    const openEditPopover = (order: typeof formOrder) => {
        setFormOrder(order);
        setIsEditing(true);
        setIsPopoverOpen(true);
    };

    const handleFormSubmit = () => {
        if (!formOrder.customer.trim()) {
            alert('Customer name is required');
            return;
        }
        if (formOrder.total <= 0) {
            alert('Total must be greater than 0');
            return;
        }

        if (isEditing) {
            updateOrder(formOrder);
        } else {
            addOrder({ ...formOrder, id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1 });
        }

        setIsPopoverOpen(false);
        setIsEditing(false);
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg font-medium">Loading Orders...</div>
            </div>
        );
    }
    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Manage Orders</h2>
                <button
                    onClick={openAddPopover}
                    className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer"
                >
                    +
                </button>
            </div>

            {/* Popover for Add/Edit */}
            {isPopoverOpen && (
                <div
                    ref={popoverRef}
                    className="absolute z-10 right-0 bg-white shadow-lg rounded-lg p-6 w-80 border border-gray-300"
                >
                    <h3 className="text-xl font-bold mb-4 font-serif">
                        {isEditing ? 'Edit Order' : 'Add New Order'}
                    </h3>
                    <div className="flex flex-col mb-3">
                        <label className="font-medium mb-1">Customer Name</label>
                        <input
                            type="text"
                            value={formOrder.customer}
                            onChange={(e) => setFormOrder({ ...formOrder, customer: e.target.value })}
                            className="border p-2 rounded w-full"
                            autoFocus
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="font-medium mb-1">Total</label>
                        <input
                            type="number"
                            min={1}
                            value={formOrder.total}
                            onChange={(e) => setFormOrder({ ...formOrder, total: +e.target.value })}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="font-medium mb-1">Status</label>
                        <select
                            value={formOrder.status}
                            onChange={(e) => setFormOrder({ ...formOrder, status: e.target.value })}
                            className="border p-2 rounded w-full"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => {
                                setIsPopoverOpen(false);
                                setIsEditing(false);
                            }}
                            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleFormSubmit}
                            className="px-4 py-2 rounded bg-blue-900 text-white"
                        >
                            {isEditing ? 'Save' : 'Add'}
                        </button>
                    </div>
                </div>
            )}

            {/* Orders Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Total</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="*:hover:bg-gray-100 transition-colors text-center">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="py-2 px-4">{order.id}</td>
                                <td className="py-2 px-4">{order.customer}</td>
                                <td className="py-2 px-4">{order.total}</td>
                                <td className="py-2 px-4">{order.status}</td>
                                <td className="py-2 px-4 space-x-2">
                                    <button
                                        onClick={() => openEditPopover(order)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => removeOrder(order.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
