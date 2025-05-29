"use client";

import { useState } from "react";
import { allProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import ZoomImage from "@/app/components/ZoomImage";
import { AnimatedButton } from "@/app/components/animatedButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
    params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
    const slug = params.slug;

    const productDetail = allProducts.find(product => product.slug === slug);

    const [quantity, setQuantity] = useState(1);

    if (!productDetail) {
        // This is the proper way to handle missing data in app router
        return notFound();
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < productDetail.availability) {
            setQuantity(quantity + 1);
        }
    };

    const subTotal = productDetail.price * quantity;

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="col-span-6 flex flex-col items-start">
                    <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden group">
                        <Image
                            src={productDetail.img}
                            alt={productDetail.title}
                            fill
                            className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-125"
                        />
                    </div>
                </div>
                <div className="col-span-6">
                    <h1 className="text-5xl">{productDetail.title}</h1>
                    <div className="w-full md:w-6/12 py-5 grid gap-y-4 *:text-gray-400">
                        <div className="flex justify-between">
                            <span className="text-md">Price</span>
                            <p className="text-md">${productDetail.price.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-md">Availability</span>
                            <p className="text-md">
                                {productDetail.availability > 0
                                    ? `${productDetail.availability} in stock`
                                    : "Out of Stock"}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-md">Brand</span>
                            <p className="text-md">{productDetail.brand}</p>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-md">Category</span>
                            <p className="text-md">{productDetail.category}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-md">Quantity</span>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleDecrease}
                                    className="px-3 border rounded"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="text-md">{quantity}</span>
                                <button
                                    onClick={handleIncrease}
                                    className="px-3 border rounded"
                                    disabled={quantity >= productDetail.availability}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between font-semibold text-md mt-4">
                            <span>Sub Total</span>
                            <p>${subTotal.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-6 items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-x-5  ">
                            <AnimatedButton className="w-full text-sm md:w-32">Add to cart</AnimatedButton>
                            <AnimatedButton className="w-full text-sm md:w-32">Wish to List</AnimatedButton>
                        </div>
                        <div className="w-full">
                            <AnimatedButton className="w-full text-sm">Buy it Now</AnimatedButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
