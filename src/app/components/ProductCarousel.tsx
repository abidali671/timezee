import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductT } from '@/lib/products';

const ProductCarousel = ({ products }: { products: ProductT[] }) => {
    return (
        <div className="relative w-full">
            <Carousel opts={{ align: 'start' }} className="w-full">
                <div className='w-10/12 mx-auto'>


                    <CarouselContent>
                        {products.map((item: ProductT, index: number) => (
                            <CarouselItem
                                key={index}
                                className="basis-full sm:basis-1/2 lg:basis-1/4 px-2"
                            >
                                <div className="bg-zinc-900 text-white rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
                                    <div className="p-4 flex flex-col items-center">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="h-40 object-contain mb-4"
                                        />
                                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                                        <p className="text-md text-gray-400 mb-2">{item.price}</p>

                                        <p className="line-through text-sm text-red-400">
                                            {item.discount}
                                        </p>

                                        <p className="text-sm mt-2 text-yellow-400">
                                            {'★'.repeat(item.rating)}
                                        </p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </div>
                {/* Absolute-positioned Nav Buttons */}
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        </div>

    );
};

export default ProductCarousel;
