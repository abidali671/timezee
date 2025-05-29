'use client';
import { useCart } from '@/context/CartContext';
import { AnimatedButton } from './animatedButton';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function CartSidebar() {
    const { cart, dispatch, isOpen, toggleCart } = useCart();

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="p-4 flex justify-between items-center">
                {cart.length > 0 && <h1 className='text-4xl text-white whitespace-nowrap'>Your cart  </h1>}
                <button onClick={toggleCart} className='text-2xl cursor-pointer'>✕</button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
                {cart.length === 0 ? (
                    <div className='flex justify-center items-center flex-col'>
                        <h1 className='text-4xl text-white whitespace-nowrap'>Your cart is empty.</h1>
                        <br />
                        <AnimatedButton className="w-full text-sm">Continue Shopping</AnimatedButton>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.slug} className="grid grid-cols-2 w-8/12 gap-4">
                            <div>
                                <Image src={item.img} alt={item.title} height={100} width={100} />
                            </div>
                            <div className='grid gap-2'>
                                <p>{item.brand}</p>
                                <h1 className='text-2xl text-white whitespace-nowrap'>{item.title}</h1>
                                <p>${(item.quantity * item.price).toFixed(2)}</p>
                                <div className='flex items-center space-x-2'>
                                    {/* Decrease quantity */}
                                    <button
                                        className="text-sm border flex items-center justify-center w-8 h-8 rounded"
                                        onClick={() =>
                                            dispatch({ type: 'DECREASE_QUANTITY', payload: item.slug })
                                        }
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>

                                    <span className="text-white">{item.quantity}</span>

                                    {/* Increase quantity */}
                                    <button
                                        className="text-sm  border flex items-center justify-center w-8 h-8 rounded"
                                        onClick={() =>
                                            dispatch({ type: 'INCREASE_QUANTITY', payload: item.slug })
                                        }
                                    >
                                        +
                                    </button>

                                    {/* Remove item */}
                                    <button
                                        className="text-sm bg-blue-950 flex items-center justify-center w-10 p-2 py-3 rounded"
                                        onClick={() =>
                                            dispatch({ type: 'REMOVE_FROM_CART', payload: item.slug })
                                        }
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="p-4 border-t">
                    <button
                        className="w-full bg-black text-white py-2 rounded cursor-pointer hover:bg-white hover:text-black transition-colors"
                        onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    >
                        Clear Cart
                    </button>
                </div>
            )}
        </div>
    );
}
