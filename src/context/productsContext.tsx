'use client';
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    useCallback,
} from 'react';
import { fetchAllProducts } from '@/lib/contentfull/client';
import { deleteContentfulProduct, updateContentfulProduct } from '@/lib/contentfull/management';
import { Document } from '@contentful/rich-text-types';

export interface Product {
    slug: string;
    id: string;
    name: string;
    price: number;
    stock: number;
    description: Document;
    imageUrl?: string;
    category?: string;
    brands?: string;
    type?: string;
    discount: number;
    rating?: number;
    excerpt?: string;
    brandName?: string;
    categoryName?: string;
    imageFile?: File | null;
}

interface ProductContextProps {
    products: Product[];
    loading: boolean;
    addProduct: (product: Product) => Promise<Product>;
    updateProduct: (product: Product, ImageFile: File | undefined) => Promise<Product>;
    removeProduct: (productId: string) => Promise<void>;
    refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const products = await fetchAllProducts();
            setProducts(products);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = async (product: Product): Promise<Product> => {
        setProducts((prev) => [...prev, product]);
        return Promise.resolve(product);
    };

    const updateProduct = async (product: Product, imageFile?: File): Promise<Product> => {
        try {
            const updatedProduct = await updateContentfulProduct(product.id, product, imageFile);

            setProducts(prev => prev.map(p => p.id === product.id ? updatedProduct : p));

            return updatedProduct;
        } catch (error) {
            await fetchProducts();
            throw error;
        }
    };



    const removeProduct = async (productId: string): Promise<void> => {
        try {
            // Optimistically remove from local state
            setProducts(prev => prev.filter(p => p.id !== productId));

            // Delete from Contentful
            await deleteContentfulProduct(productId);
        } catch (error) {
            // Refresh from server on error
            await fetchProducts();
            console.error('Failed to delete product:', error);
            throw error;
        }
    };

    const refreshProducts = async (): Promise<void> => {
        await fetchProducts();
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                addProduct,
                updateProduct,
                removeProduct,
                refreshProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = (): ProductContextProps => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};