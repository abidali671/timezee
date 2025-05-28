"use client";

import { useState } from "react";
import { allProducts } from "@/lib/products";
import Image from "next/image";
import { AnimatedButton } from "@/app/components/animatedButton";

interface ProductPageProps {
    params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
    const { slug } = params;
    const productDetail = allProducts.find(product => product.slug === slug);

    const [quantity, setQuantity] = useState(1);

    if (!productDetail) {
        return <div>Product not found</div>;
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
        <div className="flex flex-col ">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4  ">
                <div className="col-span-6 flex flex-col items-start">
                    <div className="relative w-full max-w-[550px] aspect-[4/5] mb-4">
                        <Image
                            src={productDetail.img}
                            alt={productDetail.title}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="col-span-6">
                    <h1 className="text-5xl">{productDetail.title}</h1>
                    <div className="w-full md:w-6/12 py-5 grid gap-y-4 *:text-gray-400">
                        <div className="flex justify-between w-full">
                            <span className="text-lg">Price</span>
                            <p className="text-lg">${productDetail.price.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-lg">Availability</span>
                            <p className="text-lg">
                                {productDetail.availability > 0
                                    ? `${productDetail.availability} in stock`
                                    : "Out of Stock"}
                            </p>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-lg">Brand</span>
                            <p className="text-lg">{productDetail.brand}</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-lg">Category</span>
                            <p className="text-lg">{productDetail.category}</p>
                        </div>

                        {/* Quantity selector */}
                        <div className="flex justify-between items-center w-full">
                            <span className="text-lg">Quantity</span>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleDecrease}
                                    className="px-3 border rounded"
                                    aria-label="Decrease quantity"
                                    disabled={quantity <= 1} // disable if quantity is 1
                                    style={{
                                        opacity: quantity <= 1 ? 0.5 : 1,
                                        cursor: quantity <= 1 ? "not-allowed" : "pointer",
                                    }}
                                >
                                    -
                                </button>
                                <span className="text-lg  ">{quantity}</span>
                                <button
                                    onClick={handleIncrease}
                                    className="px-3 border rounded"
                                    aria-label="Increase quantity"
                                    disabled={quantity >= productDetail.availability} // disable if quantity >= stock
                                    style={{
                                        opacity: quantity >= productDetail.availability ? 0.5 : 1,
                                        cursor: quantity >= productDetail.availability ? "not-allowed" : "pointer",
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Subtotal */}
                        <div className="flex justify-between w-full font-semibold text-lg mt-4 ">
                            <span>Sub Total</span>
                            <p>${subTotal.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-6 justify-center items-center w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-3 max-w-full md:max-w-sm place-self-start ">
                            <AnimatedButton className="w-full md:w-36 text-sm">Add to cart</AnimatedButton>
                            <AnimatedButton className="w-full md:w-36 text-sm">Wish to List</AnimatedButton>
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
