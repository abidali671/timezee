import { allProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductPage from "./productPage";
import { use } from "react";


// Generate static paths at build time
export async function generateStaticParams() {
    return allProducts.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const product = allProducts.find((p) => p.slug === slug);
    if (!product) {
        return {
            title: "Product not found",
        };
    }

    return {
        title: product.title,
        description: product.title ?? "",
    };
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const product = allProducts.find(p => p.slug === slug);
    if (!product) return notFound();

    return <ProductPage product={product} />;
}
