"use client";

import { useState } from "react";
import { AnimatedButton } from "@/app/components/animatedButton";
import ZoomImage from "@/app/components/ZoomImage";
import ProductTabs from "@/app/components/page/productDetail/ProductTabs";
import { getProductTabs } from "@/app/components/page/productDetail/productTabData";
import { useCart } from "@/context/CartContext";
import { Product } from "@/context/productsContext";

export default function ProductPage({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const { dispatch, cart } = useCart();

    const cartItem = cart.find(item => item.slug === product.slug);
    const availableStock = product.stock - (cartItem?.quantity || 0);

    const handleAddToCart = () => {
        if (availableStock <= 0) {
            alert("This product is out of stock");
            return;
        }

        if (quantity > availableStock) {
            alert(`Only ${availableStock} items available`);
            return;
        }

        dispatch({
            type: "ADD_TO_CART",
            payload: { ...product, quantity },
        });

        setQuantity(1);
    };



    return (
        <div className="flex flex-col px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8">
                <div className="col-span-6">
                    <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden group">
                        <ZoomImage
                            src={product.imageUrl || ""}
                            alt={product.name}
                            className="max-w-md"
                        />
                    </div>
                </div>
                <div className="col-span-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">{product.name}</h2>
                    <div className="w-full md:w-80 *:text-lg grid gap-y-4 text-gray-400 text-sm">
                        <div className="flex justify-between">
                            <span>Price</span>
                            <p>PKR {product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <span>Availability</span>
                            <p className={availableStock <= 0 ? "text-red-500" : ""}>
                                {availableStock > 0 ? `${availableStock} available` : "Out of Stock"}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <span>Brand</span>
                            <p>{product.brandName}</p>
                        </div>
                        <div className="flex justify-between">
                            <span>Category</span>
                            <p>{product.categoryName}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>Quantity</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-3 py-1 border rounded"
                                    disabled={quantity <= 1 || availableStock <= 0}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => Math.min(availableStock, q + 1))}
                                    className="px-3 py-1 border rounded"
                                    disabled={quantity >= availableStock || availableStock <= 0}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <div className="flex gap-4 flex-col sm:flex-row">
                            <AnimatedButton
                                onClick={handleAddToCart}
                                disabled={availableStock <= 0}
                                className="w-full md:!w-3/5 text-sm md:!max-w-sm"
                            >
                                {availableStock <= 0 ? "Out of Stock" : "Add to Cart"}
                            </AnimatedButton>
                        </div>
                        <AnimatedButton
                            className="w-full md:!w-3/5 md:!max-w-sm text-sm"
                            disabled={availableStock <= 0}
                        >
                            Buy Now
                        </AnimatedButton>
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
