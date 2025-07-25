import { notFound } from "next/navigation";
import ProductPage from "./productPage";
import {
    getProductBySlugFromContentful,
} from "@/lib/contentfull/client";

type PageProps = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: PageProps) {
    const product = await getProductBySlugFromContentful(params.slug);

    if (!product) {
        return {
            title: "Product Not Found",
            description: "The product you're looking for does not exist.",
        };
    }

    const { name, excerpt, imageUrl, slug } = product;

    return {
        title: name,
        description: excerpt || `Buy ${name} at the best price online.`,
        openGraph: {
            title: name,
            description: excerpt || `Shop now: ${name}`,
            url: `https://timezee-five.vercel.app/${slug}`,
            type: "website",
            images: imageUrl
                ? [
                    {
                        url: imageUrl,
                        width: 800,
                        height: 600,
                        alt: name,
                    },
                ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title: name,
            description: excerpt || `Check out ${name} in our store.`,
            images: imageUrl ? [imageUrl] : [],
        },
        alternates: {
            canonical: `https://timezee-five.vercel.app/${slug}`,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = params;
    const product = await getProductBySlugFromContentful(slug);

    if (!product) return notFound();

    return <ProductPage product={product} />;
}
