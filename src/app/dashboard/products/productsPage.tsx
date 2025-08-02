'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SafeImage from '@/components/ui/SafeImage';
import { ProductSidebar } from '@/app/components/ProductSidebar';
import { RefreshCcw } from 'lucide-react';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Brand } from '@/types/product';
import { Product } from '@/context/productsContext';

const emptyRichTextDocument: Document = {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: []
};

export default function ManageProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<Product>({
        defaultValues: {
            name: '',
            slug: '',
            price: 0,
            stock: 0,
            description: emptyRichTextDocument,
            discount: 0,
            rating: 1,
            category: '',
            brands: '',
            excerpt: '',
            type: 'Kids'
        }
    });

    const name = watch('name');

    // Replace the useEffect for fetching data with:
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/products');
                const data = await response.json();

                if (response.ok) {
                    setProducts(data.items || []);
                    setBrands(data.brands || []);
                    setCategories(data.categories || []);
                } else {
                    throw new Error(data.message || 'Failed to load data');
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
                toast.error('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (name) {
            const slug = name.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '');
            setValue('slug', slug);
        }
    }, [name, setValue]);

    const openAddSidebar = () => {
        reset({
            name: '',
            slug: '',
            price: 0,
            stock: 0,
            description: emptyRichTextDocument,
            discount: 0,
            rating: 1,
            category: '',
            brands: '',
            type: 'Male',
            ...products
        });
        setSelectedImage(null);
        setImagePreview(null);
        setIsEditing(false);
        setSidebarOpen(true);
    };

    const openEditSidebar = (product: Product) => {
        const htmlDescription = typeof product.description === 'object'
            ? documentToHtmlString(product.description)
            : product.description;

        reset({
            ...product,
            description: htmlDescription as any,
            slug: product.slug,
        });

        setImagePreview(product.imageUrl ?? null);
        setSelectedImage(null);
        setIsEditing(true);
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
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
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleDuplicate = async (productId: string) => {
        try {
            const response = await fetch('/api/products/duplicate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to duplicate product via API');
            }

            const result = await response.json();
            const duplicatedProduct: Product = result.data;

            // Update local state to include the new product
            setProducts(prev => [...prev, duplicatedProduct]);
            toast.success(`Product "${duplicatedProduct.name}" duplicated successfully!`);

            // Optional: Revalidate the products listing page if using App Router


        } catch (error: any) {
            console.error('Error duplicating product:', error);
            toast.error(`Failed to duplicate product: ${error.message || 'Unknown error'}`);
        }
    };


    const onSubmit = async (data: Product) => {
        closeSidebar();

        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                ...data,
                rating: Math.round(data.rating || 1),
            }));

            // This part is correct:
            if (selectedImage instanceof File) {
                formData.append('image', selectedImage); // selectedImage is a File on the client
            } else if (isEditing && !data.imageUrl && selectedImage === null) {
                formData.append('removeImage', 'true');
            }

            const endpoint = isEditing && data.id ? `/api/products/${data.id}` : '/api/products';
            const method = isEditing ? 'PATCH' : 'POST';

            const response = await fetch(endpoint, {
                method,
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'API request failed');
            }

            const result = await response.json();

            if (isEditing) {
                setProducts(prev => prev.map(p => (p.id === data.id ? result.data : p)));
                toast.success('Product updated successfully!');
            } else {
                setProducts(prev => [...prev, result.data]);
                toast.success('Product created successfully!');
            }
        } catch (error: any) {
            console.error('Error submitting product:', error);
            toast.error(`Failed to ${isEditing ? 'update' : 'create'} product: ${error.message || 'Unknown error'}`);
        }
    };



    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setProducts(prev => prev.filter(p => p.id !== id));
                toast.success('Product deleted successfully!');
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to delete product');
        } finally {
            setOpenDropdownId(null);
        }
    };

    if (loading && products.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg font-medium">Loading Products...</div>
            </div>
        );
    }

    return (
        <div className="relative flex">
            {/* Main Content */}
            <div className="flex-1 p-2 md:p-6 w-full overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Products</h2>
                    <div className="flex items-center space-x-2">
                        <RefreshCcw
                            className="transition-transform duration-300 hover:rotate-90 text-gray-200 cursor-pointer"
                            onClick={() => window.location.reload()}
                        />
                        <button
                            onClick={openAddSidebar}
                            className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer"
                            aria-label="Add new product"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Products Table */}
                <div className="w-full overflow-x-auto">
                    <table className="min-w-[800px] w-full bg-white shadow-md rounded-lg text-center">
                        <thead>
                            <tr className="bg-gray-100">
                                {['Image', 'Name', 'Price', 'Stock', 'Actions'].map((head) => (
                                    <th key={head} className="py-3 px-4 whitespace-nowrap">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="transition-colors">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4">
                                        {product?.imageUrl && (
                                            <SafeImage
                                                src={product.imageUrl}
                                                alt={product.name}
                                                width={48}
                                                height={48}
                                                className="object-cover rounded mx-auto"
                                            />
                                        )}
                                    </td>
                                    <td className="py-2 px-4 truncate max-w-[120px]">{product.name}</td>
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
                                        {openDropdownId === product?.id && (
                                            <DropdownMenu
                                                position={dropdownPosition}
                                                onEdit={() => {
                                                    openEditSidebar(product);
                                                    setOpenDropdownId(null);
                                                }}
                                                onDelete={() => handleDelete(product.id)}
                                                onDuplicate={() => handleDuplicate(product.id)}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {products.length === 0 && !loading && (
                        <div className="flex justify-center items-center my-5">
                            <span className="font-bold">No Products Found</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <ProductSidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                isEditing={isEditing}
                control={control}
                errors={errors}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                brands={brands}
                brandsLoading={loading}
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                selectedImage={selectedImage}
                watch={watch}
                setValue={setValue}
                categories={categories}
            />
        </div>
    );
}

function DropdownMenu({
    position,
    onEdit,
    onDelete,
    onDuplicate,
}: {
    position: { top: number; left: number };
    onEdit: () => void;
    onDelete: () => void;
    onDuplicate: () => void;
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
                onClick={onDuplicate}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                role="menuitem"
            >
                <span>📋</span>
                <span>Duplicate</span>
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