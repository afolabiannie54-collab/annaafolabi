import Hero from "@/components/Hero";
import Approach from "@/components/Approach";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Principles from "@/components/Principles";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Approach />
      <Work />
      <Services />
      <Principles />
      <About />
      <FinalCTA />
      <Footer />
    </main>
  );
}