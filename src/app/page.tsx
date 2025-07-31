import Header from "./components/header";
import BrandLogoSlider from "./components/page/home/BrandLogoSlider";
import BannerSection from "./components/page/home/BannerSection";
import ProductCategory from "./components/page/home/productCategory";
import ProductGallery from "./components/page/home/ProductGallery";
import ProductSlider from "./components/page/home/productSlider";
import Newsletter from "./components/page/Newsletter";
import DealBanner from "./components/page/home/DealBanner";

const Home = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  const products = data.items;
  return (
    <div>
      <Header products={products} />
      <ProductCategory />
      <ProductSlider products={products} />
      <BannerSection />
      <ProductGallery />
      <DealBanner />
      <BrandLogoSlider />
      <Newsletter />
    </div>
  );
};

export default Home;
