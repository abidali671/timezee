// lib/productTabData.tsx
import { AllProduct } from "@/lib/products";
import { TabItem } from "./ProductTabs";

export const getProductTabs = (product: AllProduct): TabItem[] => [
    {
        label: "Description",
        value: "description",
        content: (
            <p className="text-white" >
                {product.title || "No description available."}
            </p>
        ),
    },
    {
        label: "Shipping",
        value: "shipping",
        content: (
            <ul className="text-white space-y-2 list-disc list-inside" >
                <li>Free shipping on orders over $50 </li>
                <li>Delivered within 3–5 business days </li>
                <li>Tracked delivery with updates </li>
            </ul>
        ),
    },

    {
        label: "Returns",
        value: "returns",
        content: (
            <p className="text-white" >
                Easy 30 - day returns.Item must be in original condition with tags.
            </p>
        ),
    },
];
