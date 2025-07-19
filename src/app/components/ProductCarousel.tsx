'use client'
import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { AnimatedButton } from './animatedButton';
import { Product } from '@/context/productsContext';

const ProductCarousel = ({ products }: { products: Product[] }) => {
    const { dispatch } = useCart();

    // const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number) => {
    //     if (discountedPrice === 0) return null; // Return null if no discount
    //     if (originalPrice <= 0 || discountedPrice <= 0 || originalPrice <= discountedPrice) return 0; // No valid discount
    //     const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    //     return Math.round(discount); // Return rounded percentage
    // };

    // Function to handle adding item to the cart
    const handleAddToCart = async (product: Product) => {
        try {
            dispatch({
                type: 'ADD_TO_CART',
                payload: { ...product, stock: product.stock }
            });
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };
    return (
        <div className="relative w-full">
            <Carousel opts={{ align: 'start' }} className="w-full">
                <div className="w-10/12 mx-auto">
                    <CarouselContent>
                        {products.map((item: Product) => {
                            // // Check if item has a discount
                            // const hasDiscount = item.discount && item.discount > 0;
                            // const discountPercent = hasDiscount ? calculateDiscountPercentage(item.price, item.discount) : null;

                            return (
                                <CarouselItem
                                    key={item.id}
                                    className="h-full sm:basis-1/2 lg:basis-1/4"
                                >
                                    <div className="text-white shadow-lg transition-transform duration-300 relative overflow-hidden cursor-pointer group">

                                        {/* Show discount only if it's valid (greater than 0) */}
                                        {/* {hasDiscount && discountPercent !== null && (
                                            <div className="w-16 text-xs absolute top-2 right-2 bg-yellow-400 text-black whitespace-nowrap font-semibold px-2 py-1 rounded z-10">
                                                {discountPercent}% OFF
                                            </div>
                                        )} */}

                                        <div className="flex flex-col items-center relative">
                                            <div className="relative w-full h-full mb-4">
                                                <div className="absolute inset-0 rounded-none bg-gray-50/20 h-8/12 group-hover:h-full group-hover:bg-gray-50/40 transition-all duration-500 ease-in-out z-0" />
                                                <Image
                                                    src={item.imageUrl || '/fallback-image.jpg'}  // Optional chaining to handle undefined imageUrl
                                                    alt={item.name}
                                                    width={400}
                                                    height={400}
                                                    className="object-contain h-[320px] relative z-10"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    priority={false}
                                                />
                                            </div>

                                            <Link href={`/product/${item.slug}`} className="hover:underline">
                                                <h3 className="text-2xl font-bold mb-1 truncate text-center">
                                                    {item.name}
                                                </h3>
                                            </Link>

                                            <div className="flex gap-x-3 items-center">
                                                <p className="text-xl text-gray-200 mb-2">
                                                    {item.price.toFixed(2)}
                                                </p>

                                                {/* {hasDiscount && (
                                                    <p className="line-through text-sm text-red-400">
                                                        ₹{item.price.toFixed(2)}
                                                    </p>
                                                )} */}
                                            </div>

                                            <p className="text-sm text-gray-400 mb-2">
                                                {item.brandName}
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <p className="text-md text-yellow-400">
                                                    {'★'.repeat(Math.floor(item.rating || 0))}
                                                    {'☆'.repeat(5 - Math.floor(item.rating || 0))}
                                                </p>
                                            </div>

                                            <AnimatedButton
                                                onClick={() => handleAddToCart(item)}
                                                className="!w-8/12 text-xs font-light mx-auto flex mt-3"
                                                disabled={item.stock === 0}
                                            >
                                                {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                            </AnimatedButton>
                                        </div>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                </div>
                <CarouselPrevious className="absolute md:left-0 left-4 top-1/2 -translate-y-2/4 z-10" />
                <CarouselNext className="absolute md:right-0 top-1/2 right-4 -translate-y-1/2 z-10" />
            </Carousel>
        </div>
    );
};

export default ProductCarousel;
