import Header from "./components/header";
import ProductCategory from "./components/page/home/productCategory";
import ProductSlider from "./components/page/home/productSlider";

export default function Home() {
  return (
    <div>
      <Header />
      <ProductCategory />
      <ProductSlider />
    </div>
  );
}
