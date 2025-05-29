import { allProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductPage from "./productPage";

type Props = {
    params: { slug: string };
};

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
// ✅ Server Component wrapper
export default function Page({ params }: { params: Props["params"] }) {
    const product = allProducts.find(p => p.slug === params.slug);
    if (!product) return notFound();

    return <ProductPage product={product} />;
}
