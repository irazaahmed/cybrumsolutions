import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/visuals/ScrollProgress";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";
import { FloatingDock } from "@/components/visuals/FloatingDock";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyCybrum } from "@/components/sections/WhyCybrum";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { ContentHub } from "@/components/sections/ContentHub";
import { Contact } from "@/components/sections/Contact";
// import { Products } from "@/components/sections/Products"; // activate when a product is ready

export default function Home() {
  return (
    <>
      <ScrollProgress />

      {/* Fixed ambient backdrop behind every section */}
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-lines opacity-40" />
        <div className="animate-float-slow absolute left-[-10%] top-1/4 h-[32rem] w-[32rem] rounded-full bg-accent/8 blur-[140px]" />
        <div className="animate-float-slower absolute bottom-1/4 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-accent-dim/10 blur-[140px]" />
      </div>

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyCybrum />
        <HowItWorks />
        <Work />
        <About />
        <ContentHub />
        {/* <Products /> */}
        <Contact />
      </main>
      <Footer />
      <FloatingDock />
      <ScrollToTop />
    </>
  );
}
