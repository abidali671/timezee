import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import SectionTitle from "./sectionTitle";
import { logos } from "@/lib/products";



export default function BrandLogoSlider() {
    return (
        <section className="   bg-[#030D1D] py-20 ">
            <div className="  px-4 py-10 flex flex-col justify-center items-center gap-y-10">
                <SectionTitle className="text-center   font-bold text-white ">
                    The great experience
                </SectionTitle>


                <Carousel opts={{ align: 'start' }} className="w-full">
                    <div className="w-full md:w-10/12 mx-auto">

                        <CarouselContent
                            className="flex  "

                        >
                            {logos.map((logo, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-full flex justify-center  lg:basis-1/4 px-2"
                                >
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        width={180}
                                        height={60}
                                        objectFit="contain"

                                    />
                                </CarouselItem>
                            ))}

                        </CarouselContent>
                    </div>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />

                </Carousel>


            </div>
        </section>
    );
}
