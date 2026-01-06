'use client';
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
    const { cart, dispatch } = useCart();
    const handleAddToCart = (product: Product) => {
        const cartItem = cart.find(item => item.slug === product.slug);
        const currentQty = cartItem?.quantity || 0;

        if (currentQty >= product.stock) {
            alert('Product is out of stock');
            return;
        }

        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, quantity: 1 }, // stock already exists in `product`
        });
    };


    return (
        <div className="relative w-full">
            <Carousel opts={{ align: 'start' }} className="w-full">
                <div className="w-10/12 mx-auto">
                    <CarouselContent>
                        {products.map((item: Product) => {
                            const cartItem = cart.find(ci => ci.slug === item.slug);
                            const isOutOfStock = item.stock === 0 || (cartItem?.quantity || 0) >= item.stock;

                            return (
                                <CarouselItem
                                    key={item.id}
                                    className="h-full sm:basis-1/2 lg:basis-1/4"
                                >
                                    <div className="text-white shadow-lg transition-transform duration-300 relative overflow-hidden cursor-pointer group">
                                        <div className="flex flex-col items-center relative">
                                            <div className="relative w-full h-full mb-4">
                                                <div className="absolute inset-0 rounded-none bg-gray-50/20 h-8/12 group-hover:h-full group-hover:bg-gray-50/40 transition-all duration-500 ease-in-out z-0" />
                                                <Image
                                                    src={item.imageUrl || '/fallback-image.jpg'}
                                                    alt={item.name}
                                                    width={400}
                                                    height={400}
                                                    className="object-contain h-[320px] relative z-10"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    priority={false}
                                                    title='Product Image'
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
                                                disabled={isOutOfStock}
                                            >
                                                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
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
