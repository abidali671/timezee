'use client';
import Link from 'next/link';
import { AnimatedButton } from '../../components/animatedButton';
export default function CheckoutSuccess() {
    return (
        <div className="container h-screen flex flex-col justify-center items-center mx-auto px-4 py-16 text-center">
            <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase. We&rsquo;ve sent a confirmation email with your order details.
                </p>
                <Link href="/" passHref>
                    <AnimatedButton className="w-full md:w-auto">
                        Continue Shopping
                    </AnimatedButton>
                </Link>
            </div>
        </div>
    );
}