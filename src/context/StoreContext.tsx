import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

// Types
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl?: string; // Optional image URL
}

interface Order {
    id: number;
    customer: string;
    total: number;
    status: string;
}

interface StoreContextProps {
    products: Product[];
    orders: Order[];
    loading: boolean;
    addProduct: (product: Product) => void;
    updateProduct: (updatedProduct: Product) => void;
    removeProduct: (productId: number) => void;
    addOrder: (order: Order) => void;
    updateOrder: (updatedOrder: Order) => void;
    removeOrder: (orderId: number) => void;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

// Helpers
const getFromLocalStorage = <T,>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
};



// Provider
export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>(() =>
        getFromLocalStorage<Product[]>('products', [
            {
                id: 1,
                name: 'Watch A',
                price: 100,
                stock: 10,
                description: 'A classic black leather strap watch.',
                imageUrl: '', // Add your image URL or leave blank
            },
            {
                id: 2,
                name: 'Watch B',
                price: 200,
                stock: 5,
                description: 'Luxury silver metal bracelet watch.',
                imageUrl: '',
            },
            {
                id: 3,
                name: 'Watch C',
                price: 150,
                stock: 8,
                description: 'Minimalist white face, brown strap.',
                imageUrl: '',
            },
        ])
    );

    const [orders, setOrders] = useState<Order[]>(() =>
        getFromLocalStorage<Order[]>('orders', [
            { id: 101, customer: 'John Doe', total: 300, status: 'Pending' },
            { id: 102, customer: 'Jane Smith', total: 150, status: 'Shipped' },
            { id: 103, customer: 'Bob Lee', total: 220, status: 'Delivered' },
        ])
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const prod = localStorage.getItem('products');
        const ord = localStorage.getItem('orders');
        setProducts(prod ? JSON.parse(prod) : [
            { id: 1, name: 'Watch A', price: 100, stock: 10 },
            { id: 2, name: 'Watch B', price: 200, stock: 5 },
            { id: 3, name: 'Watch C', price: 150, stock: 8 }
        ]);
        setOrders(ord ? JSON.parse(ord) : [
            { id: 101, customer: 'John Doe', total: 300, status: 'Pending' },
            { id: 102, customer: 'Jane Smith', total: 150, status: 'Shipped' },
            { id: 103, customer: 'Bob Lee', total: 220, status: 'Delivered' }
        ]);
        setLoading(false);
    }, []);
    // Persist to localStorage
    useEffect(() => {
        if (!loading) localStorage.setItem('products', JSON.stringify(products));
    }, [products, loading]);

    useEffect(() => {
        if (!loading) localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders, loading]);

    // Product handlers
    const addProduct = (product: Product) => setProducts([...products, product]);
    const updateProduct = (updated: Product) =>
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));

    const removeProduct = (productId: number) =>
        setProducts(products.filter((p) => p.id !== productId));

    // Order handlers
    const addOrder = (order: Order) => setOrders([...orders, order]);
    const updateOrder = (updated: Order) =>
        setOrders((prev) => prev.map((o) => (o.id === updated.id ? { ...o, ...updated } : o)));
    const removeOrder = (orderId: number) =>
        setOrders(orders.filter((o) => o.id !== orderId));

    return (
        <StoreContext.Provider
            value={{
                loading,
                products,
                orders,
                addProduct,
                updateProduct,
                removeProduct,
                addOrder,
                updateOrder,
                removeOrder,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

// Hook
export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error('useStore must be used within a StoreProvider');
    return context;
};
