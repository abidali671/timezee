'use client';
import { useForm } from 'react-hook-form';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AnimatedButton } from '../components/animatedButton';
import Link from 'next/link';
import { createOrderInContentful } from '@/lib/contentfull/order';

type FormData = {
    name: string;
    email: string;
    phone: string;
};

export default function CheckoutPage() {
    const { cart, dispatch } = useCart();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    // Redirect if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            router.push('/');
        }
    }, [cart, router]);

    const onSubmit = async (data: FormData) => {
        try {
            const orderData = {
                customerName: data.name,
                customerEmail: data.email,
                customerPhoneNumber: data.phone,
                products: cart.map(item => ({
                    id: item.id,
                    quantity: item.stock
                })),
                status: 'pending',
                orderDate: new Date().toISOString(),
                price: cart.reduce((total, item) => total + (item.price * item.stock), 0),
            };

            await createOrderInContentful(orderData);
            dispatch({ type: 'CLEAR_CART' });
            router.push('/checkout/success');
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Order failed. Try again.');
        }
    };


    if (cart.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {cart.map(item => (
                            <div key={item.slug} className="flex justify-between py-2 border-b">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {item.stock} × PKR {item.price.toFixed(2)}
                                    </p>
                                </div>
                                <p className="font-medium">
                                    PKR {(item.stock * item.price).toFixed(2)}
                                </p>
                            </div>
                        ))}
                        <div className="flex justify-between py-4 font-bold text-lg">
                            <span>Total</span>
                            <span>PKR {cart.reduce((total, item) => total + (item.price * item.stock), 0).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="03001234567 or +923001234567"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^(?:\+92|0)[0-9]{10}$/,
                                        message: 'Enter valid Pakistani number (03001234567 or +923001234567)'
                                    }
                                })}
                                className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="pt-4">
                            <AnimatedButton type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Processing...' : 'Place Order'}
                            </AnimatedButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}