'use client';
import { useCart } from '@/context/CartContext';
import { AnimatedButton } from './animatedButton';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
    const { cart, dispatch, isOpen, toggleCart } = useCart();
    console.log(cart, 'cart===');

    return (
        <div
            className={`fixed top-0 right-0 h-full w-72 md:w-96 bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="p-4 flex justify-between items-center">
                {cart.length > 0 && <h1 className='text-4xl text-white whitespace-nowrap'>Your cart</h1>}
                <button onClick={toggleCart} className='text-2xl cursor-pointer'>✕</button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-180px)]">
                {cart.length === 0 ? (
                    <div className='flex justify-center items-center flex-col'>
                        <h1 className='text-3xl md:text-4xl text-white whitespace-nowrap'>Your cart is empty.</h1>
                        <br />
                        <AnimatedButton className="!w-10/12 md:w-full text-sm">Continue Shopping</AnimatedButton>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.slug} className="grid grid-cols-2  w-8/12 gap-4">
                            <div>
                                <Image src={item.imageUrl || 'https:' + item.image?.fields?.file?.url}
                                    alt={item.name || item.title} height={100} width={100} />
                            </div>
                            <div className='grid gap-2'>
                                <p>{item.brandName}</p>
                                <h1 className='text-md text-white whitespace-nowrap '>{item.name || item.title}</h1>
                                <p>PKR {(item.stock * item.price).toFixed(2)}</p>
                                <div className='flex items-center space-x-2'>
                                    {/* Decrease quantity */}
                                    <button
                                        className="text-sm border flex items-center justify-center w-8 h-8 rounded"
                                        onClick={() => {
                                            dispatch({ type: 'DECREASE_QUANTITY', payload: item.slug });

                                        }}
                                        disabled={item.stock <= 1}
                                    >
                                        -
                                    </button>

                                    <span className="text-white">{item.stock}</span>

                                    {/* Increase quantity */}
                                    <button
                                        className="text-sm  border flex items-center justify-center w-8 h-8 rounded"
                                        onClick={() => {
                                            dispatch({ type: 'INCREASE_QUANTITY', payload: item.slug });

                                        }}
                                        disabled={item.stock == item.inStock}
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
                                        <Trash2 size={16} cursor='pointer' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {
                cart.length > 0 && (
                    <div className='flex justify-center items-center flex-col'>
                        <Link href="/checkout" passHref>
                            <AnimatedButton
                                className="w-full text-sm"
                                onClick={toggleCart}
                            >
                                Proceed to Checkout
                            </AnimatedButton>
                        </Link>
                        <div className="p-4 flex justify-center items-center  w-full">
                            <button
                                className="   w-8/12 bg-black text-white py-2 rounded cursor-pointer hover:bg-white hover:text-black transition-colors"
                                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
