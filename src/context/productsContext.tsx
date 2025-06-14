'use client';
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from 'react';
import { fetchAllProducts } from '@/lib/contentfull/client';

// Product type
interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl?: string;
}

// Context props
interface ProductContextProps {
    products: Product[];
    loading: boolean;
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    removeProduct: (productId: string) => void;
}

// Create context
const ProductContext = createContext<ProductContextProps | undefined>(undefined);

// Provider
export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const contentfulProducts = await fetchAllProducts();

                const mappedProducts: Product[] = contentfulProducts.map((item: any) => ({
                    id: item.id || item.sys?.id,
                    name: item.title,
                    price: item.price,
                    stock: item.availability || 0,
                    description: item.description || '',
                    imageUrl: item.image?.fields?.file?.url
                        ? `https:${item.image.fields.file.url}`
                        : '',
                }));

                setProducts(mappedProducts);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Handlers
    const addProduct = (product: Product) =>
        setProducts((prev) => [...prev, product]);

    const updateProduct = (updated: Product) =>
        setProducts((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
        );

    const removeProduct = (productId: string) =>
        setProducts((prev) => prev.filter((p) => p.id !== productId));

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                addProduct,
                updateProduct,
                removeProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
