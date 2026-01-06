'use client';

import { useCart } from '@/context/CartContext';
import { AnimatedButton } from './animatedButton';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '@/context/CartContext';

export default function CartSidebar() {
    const { cart, dispatch, isOpen, toggleCart } = useCart();

    return (
        <div
            className={`fixed top-0 right-0 h-full w-72 md:w-96 bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-4xl text-white whitespace-nowrap">Your cart</h2>
                <button onClick={toggleCart} className="text-2xl cursor-pointer text-white">
                    ✕
                </button>
            </div>

            {/* Scrollable cart items */}
            <div
                className="overflow-y-auto scrollbar-hide px-4 py-4 pb-16 space-y-6"
                style={{ height: 'calc(100% - 160px)' }}
            >
                {cart.length === 0 ? (
                    <div className="flex justify-center items-center flex-col mt-10">
                        <h2 className="text-3xl md:text-4xl text-white whitespace-nowrap">Your cart is empty.</h2>
                        <br />
                        <AnimatedButton className="!w-10/12 md:w-full text-sm">Continue Shopping</AnimatedButton>
                    </div>
                ) : (
                    cart.map((item: CartItem) => {
                        const isMax = item.quantity >= item.stock;
                        const isMin = item.quantity <= 1;

                        return (
                            <div key={item.slug} className="grid grid-cols-2 w-full gap-4">
                                <div>
                                    <Image
                                        src={item.imageUrl || '/fallback-image.jpg'}
                                        alt={item.name}
                                        height={100}
                                        width={100}
                                        title='Product Image'
                                        className="rounded object-contain"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <p className="text-xs text-gray-400">{item.brandName}</p>
                                    <h1 className="text-md text-white">{item.name}</h1>
                                    <p className="text-sm text-yellow-200">
                                        PKR {(item.quantity * item.price).toFixed(2)}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="text-sm border flex items-center justify-center w-8 h-8 rounded text-white"
                                            onClick={() =>
                                                dispatch({ type: 'DECREASE_QUANTITY', payload: item.slug })
                                            }
                                            disabled={isMin}
                                        >
                                            −
                                        </button>
                                        <span className="text-white">{item.quantity}</span>
                                        <button
                                            className="text-sm border flex items-center justify-center w-8 h-8 rounded text-white"
                                            onClick={() =>
                                                dispatch({ type: 'INCREASE_QUANTITY', payload: item.slug })
                                            }
                                            disabled={isMax}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="text-sm bg-blue-950 flex items-center justify-center w-10 p-2 py-3 rounded"
                                            onClick={() =>
                                                dispatch({ type: 'REMOVE_FROM_CART', payload: item.slug })
                                            }
                                        >
                                            <Trash2 size={16} cursor="pointer" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Fixed bottom action buttons */}
            {cart.length > 0 && (
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-700 bg-gray-900">
                    <Link href="/checkout" passHref>
                        <AnimatedButton className="!w-full text-sm mb-3" onClick={toggleCart}>
                            Proceed to Checkout
                        </AnimatedButton>
                    </Link>
                    <button
                        className="w-full bg-black text-white py-2 rounded cursor-pointer hover:bg-gray-200 hover:text-black font-medium border border-black transition-colors"
                        onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    >
                        Clear Cart
                    </button>
                </div>
            )}
        </div>
    );
}
