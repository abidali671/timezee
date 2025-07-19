'use client';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartToggle({ color }: { color?: string }) {
    const { cart, toggleCart } = useCart();
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="relative cursor-pointer" onClick={toggleCart}>
            <ShoppingCart size={20} color={color} />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </div>
    );
}
