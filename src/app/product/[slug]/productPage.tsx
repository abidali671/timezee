"use client";

import { useState } from "react";
import { AnimatedButton } from "@/app/components/animatedButton";
import ZoomImage from "@/app/components/ZoomImage";
import { AllProduct } from "@/lib/products";
import ProductTabs from "@/app/components/page/productDetail/ProductTabs";
import { getProductTabs } from "@/app/components/page/productDetail/productTabData";
import { useCart } from "@/context/CartContext";



export default function ProductPage({ product }: { product: AllProduct }) {
    const [quantity, setQuantity] = useState(1);
    const subTotal = product.price * quantity;
    const { dispatch } = useCart();

    const handleAdd = (product: AllProduct) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <div className="flex flex-col px-4  ">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8">
                <div className="col-span-6">
                    <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden group">
                        <ZoomImage
                            src={product.img}
                            alt={product.title}
                            className="max-w-md"
                        />
                    </div>
                </div>
                <div className="col-span-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
                    <div className="w-full md:w-7/12 *:text-lg grid gap-y-4 text-gray-400 text-sm">
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
                            <AnimatedButton className="w-full md:w-36 text-sm" onClick={() => handleAdd(product)}>Add to Cart</AnimatedButton>

                            <AnimatedButton className="w-full md:w-36 text-sm">Wishlist</AnimatedButton>
                        </div>
                        <AnimatedButton className="w-full md:!w-8/12 text-sm">Buy Now</AnimatedButton>
                    </div>
                </div>
            </div>
            <ProductTabs
                className="mt-12"
                tabs={getProductTabs(product)}
            />
        </div>
    );
}
