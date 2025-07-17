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

// Extend Action type with increase and decrease quantity
type Action =
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'CLEAR_CART' }
    | { type: 'INCREASE_QUANTITY'; payload: string }
    | { type: 'DECREASE_QUANTITY'; payload: string };

const CartContext = createContext<{
    cart: Product[];
    dispatch: React.Dispatch<Action>;
    isOpen: boolean;
    toggleCart: () => void;
}>({
    cart: [],
    dispatch: () => { },
    isOpen: false,
    toggleCart: () => { },
});

const reducer = (state: Product[], action: Action): Product[] => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existing = state.find(item => item.slug === action.payload.slug);
            if (existing) {
                return state.map(item =>
                    item.slug === action.payload.slug
                        ? { ...item, stock: item.stock + 1 }
                        : item
                );
            }
            return [...state, { ...action.payload, stock: 1 }];
        }
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.slug !== action.payload);

        case 'CLEAR_CART':
            return [];

        case 'INCREASE_QUANTITY':
            return state.map(item =>
                item.slug === action.payload
                    ? { ...item, stock: item.stock + 1 }
                    : item
            );



        case 'DECREASE_QUANTITY':
            return state.map(item =>
                item.slug === action.payload && item.stock > 1
                    ? { ...item, stock: item.stock - 1 }
                    : item
            );

        default:
            return state;
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, dispatch] = useReducer(reducer, []);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => setIsOpen(prev => !prev);

    // Load cart from localStorage on first render
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const parsed = JSON.parse(storedCart) as Product[];
                if (Array.isArray(parsed)) {
                    dispatch({ type: 'CLEAR_CART' });
                    parsed.forEach(item => {
                        dispatch({ type: 'ADD_TO_CART', payload: item });
                    });
                }
            } catch {
                console.error('Failed to parse cart from localStorage.');
            }
        }
    }, []);

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
