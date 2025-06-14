'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContentfulProduct } from '@/lib/contentfull/management';
import { useProducts } from '@/context/productsContext';



interface ProductT {
    id?: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl?: string;
    category?: string;
    brand?: string;
    type?: string;
    discount?: number;
    rating?: number;
    imageFile?: File | null;
    slug?: string;
}

export default function ManageProducts() {
    const { products, addProduct, updateProduct, removeProduct, loading } = useProducts();
    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<ProductT>({
        defaultValues: {
            name: '',
            slug: '',
            price: 0,
            stock: 0,
            description: '',
            discount: 0,
            rating: 1,
            category: 'general',
            brand: 'rado',
            type: 'auto'
        }
    });

    const name = watch('name');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const popoverRef = useRef<HTMLDivElement>(null);

    // Generate slug from product name
    useEffect(() => {
        if (name) {
            const slug = name.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '');
            setValue('slug', slug);
        }
    }, [name, setValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                closePopover();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openAddPopover = () => {
        reset({
            name: '',
            slug: '',
            price: 0,
            stock: 0,
            description: '',
            discount: 0,
            rating: 1,
            category: 'general',
            brand: 'rado',
            type: 'auto'
        });
        setSelectedImage(null);
        setImagePreview(null);
        setIsEditing(false);
        setIsPopoverOpen(true);
    };

    const openEditPopover = (product: ProductT) => {
        reset({
            ...product,
            slug: product.name.toLowerCase().replace(/\s+/g, '-')
        });
        setImagePreview(product.imageUrl ?? null);
        setSelectedImage(null);
        setIsEditing(true);
        setIsPopoverOpen(true);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
        setIsEditing(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedImage(file);
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const handleDropdownOpen = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setDropdownPosition({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
        });
        setOpenDropdownId((currentId) => (currentId === id ? null : id));
    };

    const onSubmit = async (data: ProductT) => {
        try {
            const productData = {
                ...data,
                rating: Math.round(data.rating || 1),
                imageFile: selectedImage
            };

            // Upload to Contentful
            const contentfulProduct = await createContentfulProduct(productData, selectedImage);

            // Create image URL for local state
            let imageUrl = data.imageUrl;
            if (selectedImage) {
                imageUrl = URL.createObjectURL(selectedImage);
            }

            // Update local state
            const productToSave = {
                ...data,
                id: contentfulProduct.id,
                imageUrl,
            };

            if (isEditing && data.id) {
                updateProduct({ ...productToSave, id: data.id });
                toast.success('Product updated successfully!');
            } else {
                addProduct(productToSave);
                toast.success('Product created successfully!');
            }

            closePopover();
        } catch (error) {
            console.error('Error submitting product:', error);
            toast.error(`Failed to ${isEditing ? 'update' : 'create'} product`);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await removeProduct(id);
            toast.success('Product deleted successfully!');
            setOpenDropdownId(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
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
                    <h3 className="text-xl font-bold mb-4 font-mono">
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Product Name */}
                        <div className="flex flex-col mb-3">
                            <label className="font-medium mb-1">Product Name</label>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Product name is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="border p-2 rounded w-full"
                                    />
                                )}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Slug (read-only) */}
                        <div className="flex flex-col mb-3">
                            <label className="font-medium mb-1">Slug</label>
                            <Controller
                                name="slug"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="border p-2 rounded w-full bg-gray-100"
                                        readOnly
                                    />
                                )}
                            />
                        </div>

                        {/* Product Image */}
                        <div className="flex flex-col mb-3">
                            <label className="font-medium mb-1">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="border p-2 rounded w-full"
                                disabled={isEditing}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-2 h-32 object-cover rounded border"
                                />
                            )}
                            {!isEditing && !selectedImage && (
                                <p className="text-red-500 text-sm mt-1">
                                    Image is required for new product
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col mb-3">
                            <label className="font-medium mb-1">Description</label>
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: 'Description is required' }}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        className="border p-2 rounded w-full"
                                        rows={3}
                                    />
                                )}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex flex-col mb-3">
                            <label className="font-medium mb-1">Price</label>
                            <Controller
                                name="price"
                                control={control}
                                rules={{
                                    required: 'Price is required',
                                    min: { value: 0.01, message: 'Price must be greater than 0' }
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="number"
                                        step="0.01"
                                        className="border p-2 rounded w-full"
                                    />
                                )}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                            )}
                        </div>

                        {/* Stock */}
                        <div className="flex flex-col mb-3">
                            <label className="font-medium mb-1">Stock</label>
                            <Controller
                                name="stock"
                                control={control}
                                rules={{
                                    required: 'Stock is required',
                                    min: { value: 0, message: 'Stock cannot be negative' }
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="number"
                                        className="border p-2 rounded w-full"
                                    />
                                )}
                            />
                            {errors.stock && (
                                <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={closePopover}
                                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-blue-900 text-white"
                                disabled={!isEditing && !selectedImage}
                            >
                                {isEditing ? 'Save' : 'Add'}
                            </button>
                        </div>
                    </form>
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
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="h-12 w-12 object-cover mx-auto rounded"
                                            loading="lazy"
                                            width={100}
                                            height={100}
                                        />
                                    )}
                                </td>
                                <td className="py-2 px-4 truncate max-w-20">{product.name}</td>
                                <td className="py-2 px-4 truncate max-w-20">{product.description}</td>
                                <td className="py-2 px-4">{product.price}</td>
                                <td className="py-2 px-4">{product.stock}</td>
                                <td className="py-2 px-4 relative">
                                    <button
                                        className="text-black hover:text-black focus:outline-none cursor-pointer h-10 w-10 bg-gray-50 rounded-full"
                                        aria-haspopup="true"
                                        onClick={(e) => handleDropdownOpen(e, product.id)}
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
                                            onDelete={() => handleDelete(product.id)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Toast Notifications */}
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
}

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
                marginLeft: '-40px'
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
