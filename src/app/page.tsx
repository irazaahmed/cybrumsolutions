import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackdrop } from "@/components/visuals/AmbientBackdrop";
import { ScrollProgress } from "@/components/visuals/ScrollProgress";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";
import { FloatingDock } from "@/components/visuals/FloatingDock";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyCybrum } from "@/components/sections/WhyCybrum";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Work } from "@/components/sections/Work";
import { Proof } from "@/components/sections/Proof";
import { About } from "@/components/sections/About";
import { ContentHub } from "@/components/sections/ContentHub";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
// import { Products } from "@/components/sections/Products"; // activate when a product is ready

export default function Home() {
  return (
    <>
      <ScrollProgress />

      {/* Fixed ambient backdrop with scroll-parallax glows */}
      <AmbientBackdrop />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyCybrum />
        <HowItWorks />
        <Work />
        <Proof />
        <About />
        <ContentHub />
        <Faq />
        {/* <Products /> */}
        <Contact />
      </main>
      <Footer />
      <FloatingDock />
      <ScrollToTop />
    </>
  );
}
