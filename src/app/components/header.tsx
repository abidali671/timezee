'use client'
import React, { useState, useEffect } from "react";
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
import { fetchAllProducts } from '@/lib/contentfull/client';
import { Product } from "@/context/productsContext";
import Link from "next/link";

export default function Header() {
  const [productsData, setProductsData] = React.useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchAllProducts();
        setProductsData(response);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const defaultBanners = [
    '/images/slider1.webp',
    '/images/slider2.webp',
  ];

  return (
    <div className="relative w-full mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {loading ? (
            // Show loading state with default banner
            <CarouselItem className="relative h-[calc(100vh_-_75px)] w-full">
              <Image
                src={defaultBanners[0]}
                alt="Loading banner"
                style={{ objectFit: 'cover' }}
                fill
                className="absolute inset-0 z-0 w-full h-full"
                priority
              />
              <div className="relative justify-center ml-20 md:justify-start md:w-8/12 px-10 z-20 flex h-full w-full items-center *:text-left">
                <div className="tex p-4 md:p-8 justify-center md:justify-start items-center rounded-xl shadow-xl  w-10/12 bg-black/50 md:bg-transparent text-gray-800 md:*:text-left *:text-center text-center">
                  <div className="space-y-6">
                    <div className="h-10 w-3/4  mr-auto bg-gray-300/70 rounded animate-pulse"></div>
                    <div className="h-6 w-1/2  mr-auto bg-gray-300/50 rounded animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-1/2 bg-gray-300/40 mr-auto rounded animate-pulse"></div>

                    </div>

                    <div className="h-12 w-40  mr-auto bg-gray-300/70 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ) : productsData.length > 0 ? (
            productsData.map((product, index) => (
              <CarouselItem
                key={product.id || index}
                className="relative h-[calc(100vh_-_75px)] w-full"
              >
                <Image
                  src={defaultBanners[index % defaultBanners.length]}
                  alt={product.name}
                  style={{ objectFit: 'cover' }}
                  fill
                  className="absolute inset-0 z-0 w-full h-full"
                  priority={index === 0}
                />
                <div className={`relative ${index % 2 === 0 ? "justify-center md:w-7/12" : "justify-end md:w-11/12"} px-10 z-20 flex h-full w-full items-center *:text-left`}>
                  <div className="tex p-4 md:p-8 justify-center md:justify-start items-center rounded-xl shadow-xl max-w-full md:max-w-2xl bg-black/50 md:bg-transparent text-gray-800 md:*:text-left *:text-center text-center">
                    <SectionTitle className=' w-full md:w-full' font={true}>
                      {product.name}
                    </SectionTitle>
                    <h3 className="text-sm md:text-lg font-light text-yellow-400 mb-4">
                      {product.brand}
                    </h3>
                    <p className="text-sm md:text-xl font-light text-white/70 mb-6 leading-8">
                      {product.excerpt}
                    </p>
                    <div className="flex gap-x-4 mb-8 justify-center md:justify-start">
                      <p className="text-xl font-semibold text-white/70 flex items-end">Price</p>
                      <span className="text-yellow-400 text-2xl md:text-4xl">
                        {product.price}
                      </span>
                    </div>
                    <Link href={`/product/${product.slug}`} className="w-full">
                      <AnimatedButton className="h-10 flex text-sm md:h-16 md:mx-0 mx-auto">
                        View Product
                      </AnimatedButton>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            // Fallback if no products available
            defaultBanners.map((banner, index) => (
              <CarouselItem key={`fallback-${index}`} className="relative h-[calc(100vh_-_75px)] w-full">
                <Image
                  src={banner}
                  alt="Default banner"
                  style={{ objectFit: 'cover' }}
                  fill
                  className="absolute inset-0 z-0 w-full h-full"
                  priority={index === 0}
                />
                <div className="relative justify-center md:w-7/12 px-10 z-20 flex h-full w-full items-center *:text-left">
                  <div className="tex p-4 md:p-8 justify-center md:justify-start items-center rounded-xl shadow-xl max-w-full md:max-w-2xl bg-black/50 text-white text-center">
                    <SectionTitle className='w-full' font={true}>
                      Featured Products
                    </SectionTitle>
                    <p className="text-white/70">Discover our amazing collection</p>
                  </div>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>

        {/* Only show navigation if we have multiple items */}
        {(productsData.length > 1 || (!loading && defaultBanners.length > 1)) && (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 z-30 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 z-30 -translate-y-1/2" />
          </>
        )}
      </Carousel>
    </div>
  );
}