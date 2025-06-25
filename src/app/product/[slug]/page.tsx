import { allProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductPage from "./productPage";
import { fetchAllProducts, getProductBySlugFromContentful } from "@/lib/contentfull/client";

type PageProps = {
    params: {
        slug: string;
    };
};
// Generate static paths at build time
export async function generateStaticParams() {
    return allProducts.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
) {
    const product = await fetchAllProducts()
    if (!product.length) {
        return { title: 'Product Not Found' };
    }
    const { slug } = await params;
    const findProduct = product.find((item) => item.fields.slug === slug);
    return {
        title: findProduct?.fields.title,
        description: findProduct?.fields.excerpt || 'Product details page',
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = params;

    const product = await getProductBySlugFromContentful(slug);

    if (!product) return notFound();

    return <ProductPage product={product} />;
}
