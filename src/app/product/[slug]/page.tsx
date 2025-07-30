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
            robots: "index, follow",
        };
    }

    const { name, excerpt, imageUrl, slug } = product;

    const keywords = product.excerpt
        ? product.excerpt
            .split(" ")
            .filter((word) => word.length > 3)
            .slice(0, 10)
            .join(", ")
        : product.name;

    return {
        title: name,
        description: excerpt || `Buy ${name} at the best price online.`,
        keywords,
        robots: "index, follow",
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
            canonical: `https://timezee-five.vercel.app/product/${slug}`,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = params;
    const product = await getProductBySlugFromContentful(slug);

    if (!product) return notFound();

    return (
        <>
            {/* ✅ JSON-LD Product Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        name: product.name,
                        image: product.imageUrl ? [product.imageUrl] : [],
                        description: product.description,
                        sku: product.id,
                        brand: {
                            "@type": "Brand",
                            name: product.brandName || "Timezee",
                        },
                        offers: {
                            "@type": "Offer",
                            url: `https://timezee-five.vercel.app/product/${product.slug}`,
                            priceCurrency: "PKR", // or INR or relevant
                            price: product.price,
                            itemCondition: "https://schema.org/NewCondition",
                            availability: product.stock > 0
                                ? "https://schema.org/InStock"
                                : "https://schema.org/OutOfStock",
                        },

                        aggregateRating: {
                            "@type": "AggregateRating",
                            ratingValue: product.rating || 4.5,
                            reviewCount: 12,
                        },
                    }),
                }}
            />

            <ProductPage product={product} />
        </>
    );
}
