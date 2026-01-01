import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Product } from "@/context/productsContext";

// Lazy-load the carousel content (products) on client
const LazyCarouselContent = dynamic(
  () => import("./HeaderCarouselContent"),
  { ssr: true, loading: () => null }
);

export default function Header({ products }: { products: Product[] }) {
  return (
    <div className="relative w-full mx-auto">
      {/* Hero background image (LCP) */}
      <div className="absolute w-full h-screen">
        <Image
          src="/images/bg-dark2.jpg"
          alt="Background"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Lazy-loaded carousel content */}
      <LazyCarouselContent products={products} />
    </div>
  );
}
