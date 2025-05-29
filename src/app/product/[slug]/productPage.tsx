"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatedButton } from "@/app/components/animatedButton";

interface Product {
    title: string;
    slug: string;
    img: string;
    price: number;
    brand: string;
    category: string;
    availability: number;
    description?: string;
}

export default function ProductPage({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const subTotal = product.price * quantity;

    return (
        <div className="flex flex-col px-4 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8">
                <div className="col-span-6">
                    <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden group">
                        <Image
                            src={product.img}
                            alt={product.title}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-125"
                            priority
                        />
                    </div>
                </div>
                <div className="col-span-6">
                    <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                    <div className="w-full md:w-7/12 grid gap-y-4 text-gray-400 text-sm">
                        <div className="flex justify-between">
                            <span>Price</span>
                            <p>${product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <span>Availability</span>
                            <p>{product.availability > 0 ? `${product.availability} in stock` : "Out of Stock"}</p>
                        </div>
                        <div className="flex justify-between">
                            <span>Brand</span>
                            <p>{product.brand}</p>
                        </div>
                        <div className="flex justify-between">
                            <span>Category</span>
                            <p>{product.category}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>Quantity</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                    className="px-3 py-1 border rounded"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => quantity < product.availability && setQuantity(quantity + 1)}
                                    className="px-3 py-1 border rounded"
                                    disabled={quantity >= product.availability}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between font-semibold mt-4">
                            <span>Subtotal</span>
                            <p>${subTotal.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <div className="flex gap-4 flex-col sm:flex-row">
                            <AnimatedButton className="w-full sm:w-36">Add to Cart</AnimatedButton>
                            <AnimatedButton className="w-full sm:w-36">Wishlist</AnimatedButton>
                        </div>
                        <AnimatedButton className="w-full">Buy Now</AnimatedButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
