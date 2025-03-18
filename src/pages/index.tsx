import Hero from "@/components/Hero/Hero";
import Nav from "@/components/Nav/Nav";
import FeaturedProperties from "@/components/FeaturedProperties/FeaturedProperties";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <FeaturedProperties />
    </div>
  );
}
