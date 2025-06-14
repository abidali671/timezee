'use client';
import React, {
    createContext,
    useContext,
    useState,
    ReactNode
} from 'react';

interface Order {
    id: number;
    customer: string;
    total: number;
    status: string;
}

interface OrderContextProps {
    orders: Order[];
    loading: boolean;
    addOrder: (order: Order) => void;
    updateOrder: (order: Order) => void;
    removeOrder: (orderId: number) => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading] = useState(false);
    const addOrder = (order: Order) =>
        setOrders((prev) => [...prev, order]);

    const updateOrder = (updated: Order) =>
        setOrders((prev) =>
            prev.map((order) => (order.id === updated.id ? updated : order))
        );

    const removeOrder = (orderId: number) =>
        setOrders((prev) => prev.filter((order) => order.id !== orderId));

    return (
        <OrderContext.Provider
            value={{ orders, loading, addOrder, updateOrder, removeOrder }}
        >
            {children}
        </OrderContext.Provider>
    );
};

// ✅ Hook to use OrderContext
export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};
