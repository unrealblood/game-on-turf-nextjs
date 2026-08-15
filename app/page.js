import FeaturesSection from "./components/home/FeaturesSection";
import HeroSection from "./components/home/HeroSection";

export default function Home() {
  return (
    <div className="flex-1 overflow-y-auto mt-20 p-4">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
