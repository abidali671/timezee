import Header from "./components/header";
import BrandLogoSlider from "./components/page/home/BrandLogoSlider";
import BannerSection from "./components/page/home/BannerSection";
import ProductCategory from "./components/page/home/productCategory";
import ProductGallery from "./components/page/home/ProductGallery";
import ProductSlider from "./components/page/home/productSlider";
import Newsletter from "./components/page/Newsletter";
import DealBanner from "./components/page/home/DealBanner";
import { getProducts } from "@/lib/getProduct";

const Home = async () => {

  const { items: products } = await getProducts({ page: 1, limit: 100 });


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
