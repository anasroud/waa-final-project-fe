import Hero from "@/components/Hero/Hero";
import Nav from "@/components/Nav/Nav";
import FeaturedProperties from "@/components/FeaturedProperties/FeaturedProperties";
import AnimatedWrapper from "@/components/AnimatedWrapper/AnimatedWrapper";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <AnimatedWrapper>
        <FeaturedProperties />
      </AnimatedWrapper>
    </div>
  );
}
