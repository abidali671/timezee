'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';

interface OrderT {
    id: number;
    customer: string;
    total: number;
    status: string;
}

export default function ManageOrders() {
    const { orders, addOrder, updateOrder, removeOrder, loading } = useStore();

    const initialOrder: OrderT = {
        id: 0,
        customer: '',
        total: 0,
        status: 'Pending',
    };

    const [formOrder, setFormOrder] = useState<OrderT>(initialOrder);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const popoverRef = useRef<HTMLDivElement>(null);

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

    const resetForm = () => {
        setFormOrder(initialOrder);
        setIsEditing(false);
    };

    const validateForm = () => {
        if (!formOrder.customer.trim()) return 'Customer name is required';
        if (formOrder.total <= 0) return 'Total must be greater than 0';
        return null;
    };

    const openAddPopover = () => {
        resetForm();
        setIsPopoverOpen(true);
    };

    const openEditPopover = (order: OrderT) => {
        setFormOrder(order);
        setIsEditing(true);
        setIsPopoverOpen(true);
    };

    const handleFormSubmit = () => {
        const error = validateForm();
        if (error) {
            alert(error);
            return;
        }

        const orderToSave = {
            ...formOrder,
            id: isEditing ? formOrder.id : orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
        };

        if (isEditing) {
            updateOrder(orderToSave);
        } else {
            addOrder(orderToSave);
        }

        setIsPopoverOpen(false);
        setIsEditing(false);
    };

    const handleDropdownOpen = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setDropdownPosition({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
        });
        setOpenDropdownId((prev) => (prev === id ? null : id));
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
                <button onClick={openAddPopover} className="bg-blue-900 text-white px-4 py-2 rounded">+</button>
            </div>

            {/* Popover */}
            {isPopoverOpen && (
                <div
                    ref={popoverRef}
                    className="absolute z-10 right-0 mx-auto bg-white shadow-lg rounded-lg p-6 w-full md:w-6/12 border border-gray-300"
                >
                    <h3 className="text-xl font-bold mb-4 font-serif">
                        {isEditing ? 'Edit Order' : 'Add New Order'}
                    </h3>

                    <FormInput label="Customer Name" value={formOrder.customer} onChange={(val) => setFormOrder((o) => ({ ...o, customer: val }))} />
                    <FormInput label="Total" type="number" value={formOrder.total} onChange={(val) => setFormOrder((o) => ({ ...o, total: +val }))} />
                    <FormSelect
                        label="Status"
                        value={formOrder.status}
                        options={['Pending', 'Shipped', 'Delivered']}
                        onChange={(val) => setFormOrder((o) => ({ ...o, status: val }))}
                    />

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
                        <button onClick={handleFormSubmit} className="px-4 py-2 rounded bg-blue-900 text-white">
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
                            <th className="py-3 px-4  ">Customer</th>
                            <th className="py-3 px-4">Total</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4">{order.id}</td>
                                <td className="py-2 px-4 truncate max-w-20">{order.customer}</td>
                                <td className="py-2 px-4">{order.total}</td>
                                <td className="py-2 px-4">{order.status}</td>
                                <td className="py-2 px-4 relative">
                                    <button
                                        onClick={(e) => handleDropdownOpen(e, order.id)}
                                        className="text-black hover:text-black focus:outline-none cursor-pointer h-10 w-10 bg-gray-50 rounded-full"

                                    >
                                        ⋮
                                    </button>
                                    {openDropdownId === order.id && (
                                        <DropdownMenu
                                            position={dropdownPosition}
                                            onEdit={() => {
                                                openEditPopover(order);
                                                setOpenDropdownId(null);
                                            }}
                                            onDelete={() => {
                                                removeOrder(order.id);
                                                setOpenDropdownId(null);
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/** Reusable Form Input */
function FormInput({
    label,
    value,
    onChange,
    type = 'text',
}: {
    label: string;
    value: string | number;
    onChange: (val: string) => void;
    type?: React.HTMLInputTypeAttribute;
}) {
    return (
        <div className="flex flex-col mb-3">
            <label className="font-medium mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border p-2 rounded w-full"
            />
        </div>
    );
}

/** Reusable Select Dropdown */
function FormSelect({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: string[];
}) {
    return (
        <div className="flex flex-col mb-3">
            <label className="font-medium mb-1">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border p-2 rounded w-full"
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

/** Dropdown Menu Component */
function DropdownMenu({
    position,
    onEdit,
    onDelete,
}: {
    position: { top: number; left: number };
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div
            className="z-50 bg-white border border-gray-200 rounded-md shadow-lg w-40"
            style={{
                position: 'fixed',
                top: position.top,
                left: position.left,
                marginTop: '0.25rem',
                marginLeft: '-40px'
            }}
            role="menu"
        >
            <button
                onClick={onEdit}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                role="menuitem"
            >
                <span>✏️</span>
                <span>Edit</span>
            </button>
            <button
                onClick={onDelete}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-red-600"
                role="menuitem"
            >
                <span>🗑️</span>
                <span>Delete</span>
            </button>
        </div>
    );
}
