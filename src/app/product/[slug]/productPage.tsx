"use client";

import { useState } from "react";
import { AnimatedButton } from "@/app/components/animatedButton";
import ZoomImage from "@/app/components/ZoomImage";
import { AllProduct } from "@/lib/products";
import ProductTabs from "@/app/components/page/productDetail/ProductTabs";
import { getProductTabs } from "@/app/components/page/productDetail/productTabData";
import { useCart } from "@/context/CartContext";



export default function ProductPage({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);
    const { dispatch } = useCart();

    const handleAdd = (product: AllProduct) => {
        if (quantity > product.stock) {
            alert("Not enough stock available.");
            return;
        }

        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                ...product,
                stock: quantity,
            }
        });
    };



    return (
        <div className="flex flex-col px-4  ">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8">
                <div className="col-span-6">
                    <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden group">
                        <ZoomImage
                            src={'https:' + product.image?.fields?.file?.url}
                            alt={product.name}
                            className="max-w-md"
                        />
                    </div>
                </div>
                <div className="col-span-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{product.title}</h1>
                    <div className="w-full md:w-80 *:text-lg grid gap-y-4 text-gray-400 text-sm">
                        <div className="flex justify-between">
                            <span>Price</span>
                            <p>PKR {product.price}</p>
                        </div>
                        <div className="flex justify-between">
                            <span>Availability</span>
                            <p>{product.inStock > 0 ? `${product.inStock} in stock` : "Out of Stock"}</p>
                        </div>
                        <div className="flex justify-between">
                            <span>Brand</span>
                            <p>{product.brands.fields.name}</p>
                        </div>
                        <div className="flex justify-between">
                            <span>Category</span>
                            <p>{product.category.fields.name}</p>
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
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-1 border rounded"
                                    disabled={quantity >= product.inStock}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <div className="flex gap-4 flex-col sm:flex-row">
                            <AnimatedButton className="w-full md:!w-3/5 text-sm md:!max-w-sm" onClick={() => handleAdd(product)}>Add to Cart</AnimatedButton>

                        </div>
                        <AnimatedButton className="w-full md:!w-3/5 md:!max-w-sm text-sm">Buy Now</AnimatedButton>
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
