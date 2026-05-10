import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "../components/Nav";
import HeroSection from "../components/HeroSection";
import ScrollHero from "../components/ScrollHero";
import ServicesSection from "../components/ServicesSection";
import BeforeAfterSection from "../components/BeforeAfterSection";
import WhySection from "../components/WhySection";
import ProcessSection from "../components/ProcessSection";
import QuoteSection from "../components/QuoteSection";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";

// Register GSAP plugins globally once
gsap.registerPlugin(ScrollTrigger);

// Smooth-scroll config
ScrollTrigger.config({ limitCallbacks: true });

export default function Index() {
  useEffect(() => {
    // Refresh ScrollTrigger on font load / resize
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    // Initial refresh after fonts settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, []);

  return (
    <div style={{ background: "#070906", minHeight: "100vh" }}>
      {/* Global noise overlay */}
      <div className="noise-overlay" />

      {/* Scroll progress line */}
      <ScrollProgress />

      {/* Floating pill nav */}
      <Nav />

      {/* ── Sections ── */}
      <main>
        {/* 1. Fullscreen hero with video */}
        <HeroSection />

        {/* 2. Scroll-pinned lawn transformation sequence */}
        <ScrollHero />

        {/* 3. Six tilt service cards */}
        <ServicesSection />

        {/* 4. Before/after horizontal scroll gallery */}
        <BeforeAfterSection />

        {/* 5. Why Black Sheep — stats & pillars */}
        <WhySection />

        {/* 6. Three-step process with animated timeline */}
        <ProcessSection />

        {/* 7. Quote form + click-to-call */}
        <QuoteSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
