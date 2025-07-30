import { getProducts } from '@/lib/getProduct';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { items: products } = await getProducts({ page: 1, limit: 100 });

    const staticPages = [
        {
            url: 'https://timezee-five.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 1,
        },
        {
            url: 'https://timezee-five.vercel.app/shop',
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: 'https://timezee-five.vercel.app/contact',
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.5,
        },
    ];

    const productPages = products.map((product: any) => ({
        url: `https://timezee-five.vercel.app/product/${product.slug}`,
        changeFrequency: 'weekly' as const,
        lastModified: new Date().toISOString(),
        images: product.imageUrl ? [product.imageUrl] : [],
    }));

    return [...staticPages, ...productPages];
}
