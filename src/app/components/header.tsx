import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AnimatedButton } from "./animatedButton";
import { slideProducts } from "@/lib/products";

export default function Header() {
  return (
    <div className="relative w-full mx-auto">
      <Carousel className="w-full ">
        <CarouselContent>
          {slideProducts.map((product, index) => (
            <CarouselItem
              key={index}
              className="relative h-[calc(100vh_-_80px)] w-full "
            >
              {/* Background Image */}
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 z-0"
                priority
              />

              {/* Overlay */}
              <div
                className={`relative ${index == 0 || index == 2
                  ? "justify-center md:w-7/12"
                  : "justify-end md:w-11/12"
                  } px-10 z-20 flex h-full w-full  items-center *:text-left  `}
              >
                <div className="tex p-4 md:p-8 justify-center md:justify-start items-center  rounded-xl shadow-xl max-w-full md:max-w-2xl bg-black/50 md:bg-transparent text-gray-800 md:*:text-left *:text-center text-center">
                  <div className="relative w-10/12 mx-auto md:mx-0 md:w-5/12 ">
                    <h2 className="text-5xl md:text-6xl mb-2 text-white italic tracking-tight  ">
                      {product.title}
                    </h2>
                    <hr className=" w-auto text-red-300 border-1 md:border-3 border-yellow-400 relative bottom-4 " />
                  </div>
                  <h3 className="text-sm md:text-lg font-light text-yellow-400  mb-4">
                    {product.subtitle}
                  </h3>
                  <p className="text-sm md:text-xl font-light text-white/70 mb-6 leading-8">
                    {product.description}
                  </p>
                  <div className="flex gap-x-4 mb-8 justify-center md:justify-start">
                    <p className="text-lg  text-white/70  ">Starting @</p>
                    <span className="text-yellow-400 text-2xl md:text-4xl">
                      {product.price}
                    </span>
                  </div>

                  <AnimatedButton className="h-10 flex  text-sm md:h-16 md:mx-0 mx-auto">
                    Explore Services
                  </AnimatedButton>


                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Move buttons outside of CarouselContent */}
        <CarouselPrevious className="absolute left-4 top-1/2 z-30 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 z-30 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}
