import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Image from 'next/image';
import { ProductSidebarProps } from '@/types/product';
import { fetchAllProducts, fetchProductSlugs } from '@/lib/contentfull/client';
import { X } from 'lucide-react';



export function ProductSidebar({
    isOpen,
    onClose,
    isEditing,
    control,
    errors,
    handleSubmit,
    onSubmit,
    brands,
    brandsLoading,
    imagePreview,
    handleImageChange,
    selectedImage,
    watch,
    setValue
}: ProductSidebarProps) {
    const rating = watch('rating') || 1;
    const name = watch('name');
    const slug = watch('slug');
    const [slugHas, setSlugHas] = React.useState(false);

    // Slug generator based on name
    useEffect(() => {
        if (name) {
            const generatedSlug = name
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '');
            setValue('slug', generatedSlug);
        }
    }, [name, setValue]);

    useEffect(() => {
        async function checkSlugAvailability(): Promise<void> {
            if (!slug) return;
            try {
                const result = await fetchProductSlugs();
                const isSlugTaken = result.includes(slug);
                setSlugHas(isSlugTaken);
            } catch (error) {
                console.error('Error checking slug availability:', error);
            }
        }

        checkSlugAvailability();
    }, [slug]);

    return (
        <div>

            {isOpen && (
                <div
                    className="fixed inset-0   bg-opacity-50 backdrop-blur-xs z-50"
                    onClick={onClose}
                ></div>
            )}
            <div className={`fixed inset-y-0 right-0 w-full  md:rounded-tl-2xl md:w-6/12 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold font-mono">
                            {isEditing ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            aria-label="Close sidebar"
                        >
                            <X />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Product Name */}
                        <div className="space-y-2">
                            <label className="block font-medium">Product Name</label>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Product name is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="w-full border p-2 rounded"
                                        placeholder="Enter product name"
                                    />
                                )}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Brand */}
                        <div className="space-y-2">
                            <label className="block font-medium">Brand</label>
                            {brandsLoading ? (
                                <div className="border p-2 rounded bg-gray-100">Loading brands...</div>
                            ) : (
                                <Controller
                                    name="brands"
                                    control={control}
                                    rules={{ required: 'Brand is required' }}
                                    render={({ field }) => (
                                        <select {...field} className="w-full border p-2 rounded">
                                            <option value="">Select a Brand</option>
                                            {brands.map((brand) => (
                                                <option key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                            )}
                            {errors.brands && (
                                <p className="text-red-500 text-sm">{errors.brands.message}</p>
                            )}
                        </div>

                        {/* Type */}
                        <div className="space-y-2">
                            <label className="block font-medium">Type</label>
                            <Controller
                                name="type"
                                control={control}
                                rules={{ required: 'Type is required' }}
                                render={({ field }) => (
                                    <select {...field} className="w-full border p-2 rounded">
                                        <option value="Kids">Kids</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                )}
                            />
                            {errors.type && (
                                <p className="text-red-500 text-sm">{errors.type.message}</p>
                            )}
                        </div>

                        {/* Slug */}
                        <div className="space-y-2">
                            <label className="block font-medium">Slug</label>
                            <Controller
                                name="slug"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="w-full border p-2 rounded bg-gray-100"
                                        readOnly
                                    />
                                )}
                            />
                        </div>
                        {/* Slug Availability */}
                        {slugHas && (
                            <p className="text-green-400 text-sm font-bold">
                                This slug is already taken.
                            </p>
                        )}
                        {/* Product Image */}
                        <div className="space-y-2">
                            <label className="block font-medium">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border p-2 rounded"
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        width={200}
                                        height={200}
                                        className="h-40 w-full object-contain rounded border"
                                    />
                                </div>
                            )}
                            {!isEditing && !selectedImage && (
                                <p className="text-red-500 text-sm">
                                    Image is required for new product
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="block font-medium">Description</label>
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: 'Description is required' }}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        className="w-full border p-2 rounded"
                                        rows={3}
                                        placeholder="Enter product description"
                                    />
                                )}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label className="block font-medium">Price</label>
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
                                        className="w-full border p-2 rounded"
                                        placeholder="0.00"
                                    />
                                )}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm">{errors.price.message}</p>
                            )}
                        </div>

                        {/* Stock */}
                        <div className="space-y-2">
                            <label className="block font-medium">Stock</label>
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
                                        className="w-full border p-2 rounded"
                                        placeholder="0"
                                    />
                                )}
                            />
                            {errors.stock && (
                                <p className="text-red-500 text-sm">{errors.stock.message}</p>
                            )}
                        </div>

                        {/* Discount */}
                        <div className="space-y-2">
                            <label className="block font-medium">Discount (%)</label>
                            <Controller
                                name="discount"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="number"
                                        min="0"
                                        max="100"
                                        className="w-full border p-2 rounded"
                                        placeholder="0"
                                    />
                                )}
                            />
                        </div>

                        {/* Rating */}
                        <div className="space-y-2">
                            <label className="block font-medium">Rating ({rating})</label>
                            <Controller
                                name="rating"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        className="w-full"
                                    />
                                )}
                            />
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-blue-900 text-white cursor-pointer"
                                disabled={!isEditing && !selectedImage}
                            >
                                {isEditing ? 'Save Changes' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
}