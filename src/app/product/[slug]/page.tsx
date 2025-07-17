import { notFound } from "next/navigation";
import ProductPage from "./productPage";
import { fetchAllProducts, getProductBySlugFromContentful } from "@/lib/contentfull/client";

type PageProps = {
    params: {
        slug: string;
    };
};

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
) {
    const product = await fetchAllProducts()
    if (!product.length) {
        return { title: 'Product Not Found' };
    }
    const { slug } = await params;
    const findProduct = product.find((item) => item.slug === slug);

    return {
        title: findProduct?.name,
        description: findProduct?.excerpt || 'Product details page',
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = params;

    const product = await getProductBySlugFromContentful(slug);
    if (!product) return notFound();

    return <ProductPage product={product} />;
}
