'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContentfulProduct, fetchAllBrands, fetchAllCategories, updateContentfulProduct } from '@/lib/contentfull/management';
import { useProducts } from '@/context/productsContext';
import SafeImage from '@/components/ui/SafeImage';
import { ProductT, Brand } from '@/types/product';
import { ProductSidebar } from '@/app/components/ProductSidebar';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { duplicateContentfulProduct } from '../../../lib/contentfull/management';
import { RefreshCcw } from 'lucide-react';

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
            brands: '',
            excerpt: '',
            type: 'Kids'
        }
    });

    const name = watch('name');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, SetCategories] = useState<any>([])
    const [brandsLoading, setBrandsLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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
        const loadBrands = async () => {
            try {
                setBrandsLoading(true);
                const contentfulBrands = await fetchAllBrands();
                const mappedBrands = contentfulBrands.map((brand: any) => ({
                    id: brand.sys.id,
                    name: brand.fields.name?.['en-US'] || 'Unnamed Brand'
                }));
                setBrands(mappedBrands);
            } catch (error) {
                console.error('Failed to fetch brands:', error);
                toast.error('Failed to load brands');
            } finally {
                setBrandsLoading(false);
            }
        };
        loadBrands();
    }, []);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setBrandsLoading(true);
                const contentfulBrands = await fetchAllCategories();
                const mappedBrands = contentfulBrands.map((category: any) => ({
                    id: category.sys.id,
                    name: category.fields.name?.['en-US'] || 'Unnamed category'
                }));
                SetCategories(mappedBrands);
            } catch (error) {
                console.error('Failed to fetch brands:', error);
                toast.error('Failed to load brands');
            } finally {
                setBrandsLoading(false);
            }
        };
        loadCategories();
    }, []);

    const openAddSidebar = () => {
        reset({
            name: '',
            slug: '',
            price: 0,
            stock: 0,
            description: '',
            discount: 0,
            rating: 1,
            category: 'general',
            brands: '',
            type: 'Male'
        });
        setSelectedImage(null);
        setImagePreview(null);
        setIsEditing(false);
        setSidebarOpen(true);
    };

    const openEditSidebar = (product: ProductT) => {
        reset({
            ...product,
            description: typeof product.description === 'object'
                ? documentToHtmlString(product.description)
                : product.description,
            slug: product.name.toLowerCase().replace(/\s+/g, '-'),

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
        setOpenDropdownId((currentId) => (currentId === id ? null : id));
    };

    const handleDuplicate = async (productId: string) => {
        try {
            const newProduct = await duplicateContentfulProduct(productId);
            await addProduct(newProduct);
            toast.success('Product duplicated successfully!');
            setOpenDropdownId(null);
        } catch (error) {
            toast.error('Failed to duplicate product', error);
        }
    };


    const onSubmit = async (data: ProductT) => {
        closeSidebar();
        try {
            const productData = {
                ...data,
                rating: Math.round(data.rating || 1),
                imageFile: selectedImage
            };

            let contentfulProduct;
            let clientSideImageUrl = data.imageUrl;

            if (isEditing && data.id) {
                contentfulProduct = await updateContentfulProduct(data.id, productData, selectedImage || undefined);
            } else {
                contentfulProduct = await createContentfulProduct(productData, selectedImage);
                if (selectedImage) {
                    clientSideImageUrl = URL.createObjectURL(selectedImage);
                }
            }

            const productToSave = {
                ...data,
                id: contentfulProduct.id,
                imageUrl: data.imageUrl || clientSideImageUrl,
            };

            if (isEditing && data.id) {
                await updateProduct(productToSave, contentfulProduct.imageUrl);
                toast.success('Product updated successfully!');
            } else {
                await addProduct(productToSave);
                toast.success('Product created successfully!');
            }


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
        <div className="relative flex">
            {/* Main Content */}
            <div className="flex-1 p-2 md:p-6 w-full overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Manage Products</h2>
                    <div className="flex items-center space-x-2">
                        <RefreshCcw className="transition-transform duration-300 hover:rotate-90 text-gray-200 cursor-pointer" />
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
                                {['ID', 'Image', 'Name', 'Price', 'Stock', 'Actions'].map((head) => (
                                    <th key={head} className="py-3 px-4 whitespace-nowrap">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="transition-colors">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 max-w-20">{product.id}</td>
                                    <td className="py-2 px-4">
                                        {product.imageUrl && (
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
                                    {/* <td className="py-2 px-4 truncate max-w-[150px]">
                                        {documentToReactComponents(product.description as any)}
                                    </td> */}
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

                    {products.length === 0 && (
                        <div className="flex justify-center items-center my-5">
                            <span className="font-bold">No Products..</span>
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
                brandsLoading={brandsLoading}
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                selectedImage={selectedImage}
                watch={watch}
                setValue={setValue}
                categories={categories}
            />

            {/* Toast Notifications */}
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
                onClick={onDelete}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-red-600"
                role="menuitem"
            >
                <span>🗑️</span>
                <span>Delete</span>
            </button>
            <button
                onClick={onDuplicate}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                role="menuitem"
            >
                <span>📋</span>
                <span>Duplicate</span>
            </button>

        </div>
    );
}