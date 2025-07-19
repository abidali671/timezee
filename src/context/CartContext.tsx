'use client';

import React, {
    createContext,
    useReducer,
    useContext,
    ReactNode,
    useEffect,
    useState,
} from 'react';
import { Product } from './productsContext';

export interface CartItem extends Product {
    quantity: number;
}

type Action =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'CLEAR_CART' }
    | { type: 'INCREASE_QUANTITY'; payload: string }
    | { type: 'DECREASE_QUANTITY'; payload: string };

const CartContext = createContext<{
    cart: CartItem[];
    dispatch: React.Dispatch<Action>;
    isOpen: boolean;
    toggleCart: () => void;
}>({
    cart: [],
    dispatch: () => { },
    isOpen: false,
    toggleCart: () => { },
});

const reducer = (state: CartItem[], action: Action): CartItem[] => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existing = state.find(item => item.slug === action.payload.slug);
            if (existing) {
                if (existing.quantity >= existing.stock) return state;

                return state.map(item =>
                    item.slug === action.payload.slug
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // Use quantity from payload if loading from localStorage
            const initialQuantity = action.payload.quantity || 1;

            // Never add more than stock
            if (initialQuantity > action.payload.stock) {
                return [...state, { ...action.payload, quantity: action.payload.stock }];
            }

            return [...state, { ...action.payload, quantity: initialQuantity }];
        }

        case 'INCREASE_QUANTITY':
            return state.map(item =>
                item.slug === action.payload && item.quantity < item.stock
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

        case 'DECREASE_QUANTITY':
            return state.map(item =>
                item.slug === action.payload && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );

        case 'REMOVE_FROM_CART':
            return state.filter(item => item.slug !== action.payload);

        case 'CLEAR_CART':
            return [];

        default:
            return state;
    }
};


export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, dispatch] = useReducer(reducer, []);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => setIsOpen(prev => !prev);

    // ✅ Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const parsed = JSON.parse(storedCart) as CartItem[];
                if (Array.isArray(parsed)) {
                    dispatch({ type: 'CLEAR_CART' });
                    parsed.forEach(item => {
                        if (!item.slug || item.quantity < 1) return;
                        dispatch({
                            type: 'ADD_TO_CART',
                            payload: item,
                        });
                    });
                }
            } catch {
                console.error('Failed to parse cart from localStorage.');
            }
        }
    }, []);

    // ✅ Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch, isOpen, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
