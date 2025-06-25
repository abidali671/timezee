import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

import { AnimatedButton } from './animatedButton';
import { AllProduct } from '@/lib/products';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const ProductCarousel = ({ products }: { products: any }) => {
    function calculateDiscountPercentage(originalPrice: number, discountedPrice: number) {
        if (originalPrice <= 0 || originalPrice <= discountedPrice) return 0;

        const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
        return Math.round(discount);
    }
    const { dispatch } = useCart();
    const handleAddToCart = (product: AllProduct) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <div className="relative w-full">
            <Carousel opts={{ align: 'start' }} className="w-full">
                <div className="w-10/12 mx-auto">
                    <CarouselContent>
                        {products.map((item: AllProduct, index: number) => {
                            const hasDiscount = item.discount > item.price;
                            const discountPercent = hasDiscount
                                ? calculateDiscountPercentage(item.discount, item.price)
                                : 0;

                            return (

                                <CarouselItem
                                    key={index}
                                    className="basis-full sm:basis-1/2 lg:basis-1/4 "
                                >

                                    <div className="bg-zinc-900 text-white rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden cursor-pointer">
                                        {/* % OFF Label */}
                                        {hasDiscount && (
                                            <div className=" w-16 text-xs absolute top-2 right-2 bg-yellow-400 text-black  whitespace-nowrap font-semibold px-2 py-1 rounded">
                                                {discountPercent}% OFF
                                            </div>
                                        )}

                                        {/* Background */}
                                        <div className="absolute -z-10 inset-0 h-60   opacity-100 transition-opacity duration-300"></div>

                                        {/* Content */}
                                        <div className="p-4 flex flex-col items-center">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                className="w-60 object-contain mb-4 max-h-32"
                                            />
                                            <Link href={`/product/${item.slug}`}><h3 className="text-xl    font-semibold mb-1 text-center hover:underline">{item.name}</h3></Link>

                                            <div className="flex gap-x-3 items-center">
                                                <p className="text-xl text-gray-200 mb-2">
                                                    ₹{item.price.toFixed(2)}
                                                </p>

                                                {/* Show original price only if discount exists */}
                                                {hasDiscount && (
                                                    <p className="line-through text-sm text-red-400">
                                                        ₹{item.discount.toFixed(2)}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Rating */}
                                            <p className="text-md mt-2 text-yellow-400">
                                                {'★'.repeat(item.rating)}
                                            </p>
                                            <p className="text-md mt-2 text-yellow-400">
                                                {item.brandName}
                                            </p>
                                            <AnimatedButton onClick={() => handleAddToCart(item)} className='!w-8/12 text-xs font-light mx-auto flex mt-3'>
                                                Add to Cart
                                            </AnimatedButton>
                                        </div>
                                    </div>

                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                </div>
                {/* Nav Buttons */}
                <CarouselPrevious className="absolute md:left-0 top-1/2 -translate-y-2/4 z-10" />
                <CarouselNext className="absolute  md:right-0 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        </div>
    );
};

export default ProductCarousel;
