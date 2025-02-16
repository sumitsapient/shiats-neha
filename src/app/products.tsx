import ProductCarousel from "@/components/Featured-products/FeaturedProducts";
import Header from "@/components/Header/Header";
import HomeBanner from "@/components/HeroBanner/HeroBanner";

export default function Home() {
  return (
    <>
      <Header />
      <HomeBanner />
      <ProductCarousel />
    </>
  );
}
