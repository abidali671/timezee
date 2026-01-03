import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AnimatedButton } from "./animatedButton";
import SectionTitle from "./page/home/sectionTitle";
import { Product } from "@/context/productsContext";
import Link from "next/link";

export default function HeaderCarouselContent({ products }: { products: Product[] }) {
    return (
        <Carousel className="w-full">
            <CarouselContent className="relative z-20">
                {products.map((product, index) => (
                    <CarouselItem
                        key={product.id || index}
                        className="relative h-[calc(100vh_-_75px)] w-full"
                    >
                        <Image
                            src={product.imageUrl as string}
                            alt={product.name}
                            style={{ objectFit: "contain" }}
                            width={600}
                            height={600}
                            className={`absolute w-[270px] lg:w-[600px] h-[270px] lg:h-[600px] ${index % 2 === 0
                                    ? "right-40 md:right-32 bottom-20 md:bottom-0"
                                    : "left-48 bottom-20 md:bottom-0 md:left-32"
                                } z-20`}
                        />
                        <div
                            className={`relative top-6 ${index % 2 === 0 ? "justify-center md:w-7/12" : "justify-end md:w-11/12"
                                } px-10 z-20 flex h-full w-full items-center`}
                        >
                            <div className="p-4 md:p-8 justify-center md:justify-start items-center rounded-xl shadow-xl max-w-full md:max-w-4xl bg-black/85 py-7 md:bg-transparent text-gray-800 text-center md:text-left">
                                <SectionTitle font={true}>{product.name}</SectionTitle>
                                <h3 className="text-sm md:text-lg font-light text-yellow-400 mb-4">
                                    {product.brandName}
                                </h3>
                                <p className="text-sm md:text-xl font-light text-white/70 mb-6 leading-8">
                                    {product.excerpt}
                                </p>
                                <div className="flex gap-x-4 mb-8 justify-center md:justify-start">
                                    <p className="text-xl font-semibold text-white/70 flex items-end">Price</p>
                                    <span className="text-yellow-400 text-2xl md:text-4xl">{product.price}</span>
                                </div>
                                <Link href={`/product/${product.slug}`}>
                                    <AnimatedButton className="h-10 flex text-sm md:h-16 md:mx-0 mx-auto">
                                        View Product
                                    </AnimatedButton>
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {(products.length > 1) && (
                <>
                    <CarouselPrevious className="absolute left-1 md:left-4 top-1/2 z-30 -translate-y-1/2" />
                    <CarouselNext className="absolute right-1 md:right-4 top-1/2 z-30 -translate-y-1/2" />
                </>
            )}
        </Carousel>
    );
}
