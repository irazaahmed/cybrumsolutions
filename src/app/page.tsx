import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackdrop } from "@/components/visuals/AmbientBackdrop";
import { ScrollProgress } from "@/components/visuals/ScrollProgress";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";
import { FloatingDock } from "@/components/visuals/FloatingDock";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { Services } from "@/components/sections/Services";
import { VisionMission } from "@/components/sections/VisionMission";
import { WhyCybrum } from "@/components/sections/WhyCybrum";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Work } from "@/components/sections/Work";
import { Testimonials } from "@/components/sections/Testimonials";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { CtaBand } from "@/components/sections/CtaBand";
import { Products } from "@/components/sections/Products";

/**
 * Homepage: a condensed overview of the whole site. Every section is a teaser
 * that links out to its dedicated route (/services, /work, /about, /contact),
 * so the page stays scannable while the depth lives on its own pages.
 */
export default function Home() {
  return (
    <>
      <ScrollProgress />

      {/* Fixed ambient backdrop with scroll-parallax glows */}
      <AmbientBackdrop />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Showcase />
        <Services />
        <VisionMission />
        <Products />
        <WhyCybrum />
        <HowItWorks />
        <Work />
        <Testimonials />
        <AboutTeaser />
        {/* id keeps legacy /#contact anchor links landing on the CTA */}
        <CtaBand id="contact" />
      </main>
      <Footer />
      <FloatingDock />
      <ScrollToTop />
    </>
  );
}
