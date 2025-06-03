'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';

export default function ManageProducts() {
    const { products, addProduct, updateProduct, removeProduct, loading } = useStore();

    const [formProduct, setFormProduct] = useState({ id: 0, name: '', price: 0, stock: 0 });
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsPopoverOpen(false);
                setIsEditing(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openAddPopover = () => {
        setFormProduct({ id: 0, name: '', price: 0, stock: 0 });
        setIsEditing(false);
        setIsPopoverOpen(true);
    };

    const openEditPopover = (product: typeof formProduct) => {
        setFormProduct(product);
        setIsEditing(true);
        setIsPopoverOpen(true);
    };

    const handleFormSubmit = () => {
        if (!formProduct.name.trim()) {
            alert('Product name is required');
            return;
        }
        if (formProduct.price <= 0) {
            alert('Price must be greater than 0');
            return;
        }
        if (formProduct.stock < 0) {
            alert('Stock cannot be negative');
            return;
        }


        if (isEditing) {
            updateProduct(formProduct);
        } else {
            addProduct({ ...formProduct, id: products.length > 0 ? products[products.length - 1].id + 1 : 1 });
        }

        setIsPopoverOpen(false);
        setIsEditing(false);
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg font-medium">Loading Products...</div>
            </div>
        );
    }
    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Manage Products</h2>
                <button
                    onClick={openAddPopover}
                    className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer"
                >
                    +
                </button>
            </div>

            {/* Popover */}
            {isPopoverOpen && (
                <div
                    ref={popoverRef}
                    className="absolute z-10 right-0 bg-white shadow-lg rounded-lg p-6 w-80 border border-gray-300"
                >
                    <h3 className="text-xl font-bold mb-4 font-serif">
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <div className="flex flex-col mb-3">
                        <label className="font-medium mb-1">Product Name</label>
                        <input
                            type="text"
                            value={formProduct.name}
                            onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="font-medium mb-1">Price</label>
                        <input
                            type="number"
                            value={formProduct.price}
                            onChange={(e) => setFormProduct({ ...formProduct, price: +e.target.value })}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="font-medium mb-1">Stock</label>
                        <input
                            type="number"
                            value={formProduct.stock}
                            onChange={(e) => setFormProduct({ ...formProduct, stock: +e.target.value })}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setIsPopoverOpen(false)}
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

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="py-3 px-4 w-20">ID</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Stock</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="*:hover:bg-gray-100 transition-colors text-center">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="py-2 px-4">{product.id}</td>
                                <td className="py-2 px-4">{product.name}</td>
                                <td className="py-2 px-4">{product.price}</td>
                                <td className="py-2 px-4">{product.stock}</td>
                                <td className="py-2 px-4 space-x-2">
                                    <button
                                        onClick={() => openEditPopover(product)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => removeProduct(product.id)}
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
