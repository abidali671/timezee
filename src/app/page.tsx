import Header from "./components/header";
import BrandLogoSlider from "./components/page/home/BrandLogoSlider";
import BannerSection from "./components/page/home/BannerSection";
import ProductCategory from "./components/page/home/productCategory";
import ProductGallery from "./components/page/home/ProductGallery";
import ProductSlider from "./components/page/home/productSlider";
import Newsletter from "./components/page/Newsletter";
import DealBanner from "./components/page/home/DealBanner";
import { fetchAllProducts } from "@/lib/contentfull/client";

export default async function Home() {
  const products = await fetchAllProducts();
  return (
    <div>
      <Header products={products} />
      <ProductCategory />
      <ProductSlider />
      <BannerSection />
      <ProductGallery />
      <DealBanner />
      <BrandLogoSlider />
      <Newsletter />
    </div>
  );
}
