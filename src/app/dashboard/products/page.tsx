'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';

interface ProductT {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl?: string;
}

export default function ManageProducts() {
    const { products, addProduct, updateProduct, removeProduct, loading } = useStore();

    const initialFormState: ProductT = {
        id: 0,
        name: '',
        price: 0,
        stock: 0,
        description: '',
        imageUrl: '',
    };

    const [formProduct, setFormProduct] = useState<ProductT>(initialFormState);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const popoverRef = useRef<HTMLDivElement>(null);

    // Convert File to Base64 string
    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });

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

    // Open add product popover
    const openAddPopover = () => {
        resetForm();
        setIsPopoverOpen(true);
        setIsEditing(false);
    };

    // Open edit product popover
    const openEditPopover = (product: ProductT) => {
        setFormProduct(product);
        setImagePreview(product.imageUrl ?? null);
        setSelectedImage(null);
        setIsEditing(true);
        setIsPopoverOpen(true);
    };

    // Reset form state
    const resetForm = () => {
        setFormProduct(initialFormState);
        setSelectedImage(null);
        setImagePreview(null);
    };

    // Handle dropdown toggle & positioning
    const handleDropdownOpen = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setDropdownPosition({
            top: rect.bottom + window.scrollY + 4, // small offset
            left: rect.left + window.scrollX,
        });
        setOpenDropdownId((currentId) => (currentId === id ? null : id));
    };

    // Validate form before submit
    const validateForm = () => {
        if (!formProduct.name.trim()) return 'Product name is required';
        if (formProduct.price <= 0) return 'Price must be greater than 0';
        if (formProduct.stock < 0) return 'Stock cannot be negative';
        if (!formProduct.description.trim()) return 'Description is required';
        if (!isEditing && !selectedImage) return 'Image is required for new product';
        return null;
    };

    // Submit handler for form
    const handleFormSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            alert(validationError);
            return;
        }

        let imageUrl = formProduct.imageUrl || '/images/product1.webp';
        if (selectedImage) {
            imageUrl = await toBase64(selectedImage);
        }

        const productToSave = {
            ...formProduct,
            imageUrl,
            id: isEditing ? formProduct.id : (products.length > 0 ? products[products.length - 1].id + 1 : 1),
        };

        if (isEditing) {
            updateProduct(productToSave);
        } else {
            addProduct(productToSave);
        }

        resetForm();
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
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Manage Products</h2>
                <button
                    onClick={openAddPopover}
                    className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer"
                    aria-label="Add new product"
                >
                    +
                </button>
            </div>

            {/* Popover */}
            {isPopoverOpen && (
                <div
                    ref={popoverRef}
                    className="absolute z-10 right-0 mx-auto bg-white shadow-lg rounded-lg p-6 w-full md:w-6/12 border border-gray-300"
                    role="dialog"
                    aria-modal="true"
                >
                    <h3 className="text-xl font-bold mb-4 font-mono">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>

                    <FormInput label="Product Name" value={formProduct.name} onChange={(val) => setFormProduct((p) => ({ ...p, name: val }))} />
                    <FormFileInput
                        label="Product Image"
                        onFileSelect={(file) => {
                            setSelectedImage(file);
                            setImagePreview(file ? URL.createObjectURL(file) : null);
                        }}
                        imagePreview={imagePreview}
                    />
                    <FormTextarea label="Description" value={formProduct.description} onChange={(val) => setFormProduct((p) => ({ ...p, description: val }))} />
                    <FormInput label="Price" type="number" value={formProduct.price} onChange={(val) => setFormProduct((p) => ({ ...p, price: +val }))} />
                    <FormInput label="Stock" type="number" value={formProduct.stock} onChange={(val) => setFormProduct((p) => ({ ...p, stock: +val }))} />

                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => {
                                resetForm();
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

            {/* Products Table */}
            <div className="overflow-x-auto relative">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            {['ID', 'Image', 'Name', 'Desc', 'Price', 'Stock', 'Actions'].map((head) => (
                                <th key={head} className="py-3 px-4 w-20">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-center transition-colors">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4">{product.id}</td>
                                <td className="py-2 px-4">
                                    {product.imageUrl && (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="h-12 w-12 object-cover mx-auto rounded"
                                            loading="lazy"
                                        />
                                    )}
                                </td>
                                <td className="py-2 px-4  truncate max-w-20">{product.name}</td>
                                <td className="py-2 px-4 truncate max-w-20">{product.description.length > 40 ? product.description.slice(0, 40) + '...' : product.description}</td>
                                <td className="py-2 px-4">{product.price}</td>
                                <td className="py-2 px-4">{product.stock}</td>
                                <td className="py-2 px-4 relative">
                                    <button
                                        onClick={(e) => handleDropdownOpen(e, product.id)}
                                        className="text-black hover:text-black focus:outline-none cursor-pointer h-10 w-10 bg-gray-50 rounded-full"
                                        aria-haspopup="true"
                                        aria-expanded={openDropdownId === product.id}
                                        aria-label={`Open actions for product ${product.name}`}
                                    >
                                        ⋮
                                    </button>

                                    {openDropdownId === product.id && (
                                        <DropdownMenu
                                            position={dropdownPosition}
                                            onEdit={() => {
                                                openEditPopover(product);
                                                setOpenDropdownId(null);
                                            }}
                                            onDelete={() => {
                                                removeProduct(product.id);
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

/** Textarea component */
function FormTextarea({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
}) {
    return (
        <div className="flex flex-col mb-3">
            <label className="font-medium mb-1">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border p-2 rounded w-full"
                rows={3}
            />
        </div>
    );
}

/** File input with image preview */
function FormFileInput({
    label,
    onFileSelect,
    imagePreview,
}: {
    label: string;
    onFileSelect: (file: File | null) => void;
    imagePreview: string | null;
}) {
    return (
        <div className="flex flex-col mb-3">
            <label className="font-medium mb-1">{label}</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    onFileSelect(file);
                }}
                className="border p-2 rounded w-full"
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-cover rounded border" />}
        </div>
    );
}

/** Dropdown menu component */
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
            className="z-50 bg-white border border-gray-200 rounded-md shadow-lg w-40  "
            style={{
                position: 'fixed',
                top: position.top,
                left: position.left,
                marginTop: '0.25rem',
                marginLeft:'-40px'
            }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="actions-menu"
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
