import { getEnvironment } from "@/lib/contentful-services";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const env = await getEnvironment();
        const entries = await env.getEntries({ content_type: 'categories', limit: 100, include: 2 });
        const res = entries.items.map((brand: any) => ({
            id: brand.sys.id,
            name: brand.fields.name?.['en-US'] || 'Unnamed categories'
        }));
        return NextResponse.json({
            items: res,
            count: entries.items.length,
            total: entries.total,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return new Response('Internal Server Error', { status: 500 });
    }

}
