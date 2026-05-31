import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TraitsWheel from "@/components/home/TraitsWheel";
import ImpactCounter from "@/components/home/ImpactCounter";
import PortfolioCards from "@/components/home/PortfolioCards";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TraitsWheel />
        <PortfolioCards />
        <ImpactCounter />
      </main>
      <Footer />
    </>
  );
}
