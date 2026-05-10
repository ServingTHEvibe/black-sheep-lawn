import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── REPLACE HERO VIDEO ───────────────────────────────────────────
// Drop your hero .mp4 file into: packages/web/public/hero.mp4
// The video plays on loop in the background with scroll-controlled overlay effects
// ─────────────────────────────────────────────────────────────────

const TRUST_CHIPS = [
  "Des Moines Local",
  "Clean Stripes",
  "Lawn Revival",
  "Reliable Service",
  "Since 2019",
  "Locally Owned",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // ── Initial entrance animations ──
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(headlineRef.current,
        { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power4.out" }
      )
      .fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5"
      )
      .fromTo(ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4"
      )
      .fromTo(chipsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4"
      );

      // ── Parallax on scroll ──
      gsap.to(videoWrapRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // ── Overlay darkens as you scroll ──
      gsap.to(overlayRef.current, {
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1.2,
        },
      });

      // ── Content fades out on scroll ──
      gsap.to([headlineRef.current, subRef.current, ctaRef.current, chipsRef.current], {
        y: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "65% top",
          scrub: 1,
        },
      });

      // ── Scroll indicator fade ──
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 16,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "5% top",
          end: "20% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToTransformations = () => {
    document.getElementById("transformations")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#070906" }}
    >
      {/* ── Video background ── */}
      <div ref={videoWrapRef} className="absolute inset-0 w-full h-full will-change-transform">
        {/* REPLACE: swap src to your uploaded hero video */}
        <video
          ref={videoRef}
          className="hero-video"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ filter: "brightness(0.45) contrast(1.15) saturate(0.8)" }}
        />
        {/* Fallback gradient if video doesn't load */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #070906 0%, #0e1f0a 50%, #070906 100%)",
            zIndex: -1,
          }}
        />
      </div>

      {/* ── Gradient overlay ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(7,9,6,0.3) 0%, rgba(7,9,6,0.5) 40%, rgba(7,9,6,0.85) 100%)",
          opacity: 0.7,
        }}
      />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(7,9,6,0.8) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-[3] w-full max-w-[1280px] mx-auto px-5 md:px-16 flex flex-col items-start justify-center min-h-screen pt-28 pb-24">

        {/* Trust badge */}
        <div className="label-caps flex items-center gap-2 text-spring-green mb-6 opacity-0" ref={chipsRef}
          style={{ animationFillMode: "forwards" }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-spring-green animate-pulse" />
          Des Moines, Iowa · Est. 2019
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-black leading-none tracking-tight mb-7 opacity-0"
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(48px, 8.5vw, 116px)",
            maxWidth: "1000px",
            letterSpacing: "-0.04em",
          }}
        >
          DES MOINES{" "}
          <br />
          <span className="text-gradient-green">LAWNS</span>,
          <br />
          BUILT DIFFERENT.
        </h1>

        {/* Subtext */}
        <p
          ref={subRef}
          className="text-on-surface opacity-0 mb-10 max-w-xl leading-relaxed"
          style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: "#b5b9b5" }}
        >
          Premium mowing, striping, lawn repair, and seasonal property care for
          homeowners who want their yard handled right.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 items-center opacity-0 mb-12">
          <button
            onClick={scrollToContact}
            className="btn-pulse relative bg-spring-green text-[#070906] font-bold px-8 py-4 rounded-full hover:scale-105 hover:brightness-110 transition-all"
            style={{ fontFamily: "Sora, sans-serif", fontSize: 16, letterSpacing: "-0.01em" }}
          >
            Get a Free Quote
          </button>
          <button
            onClick={scrollToTransformations}
            className="glass flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 15 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" />
              <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="white" />
            </svg>
            See Transformations
          </button>

          {/* Click to call */}
          <a
            href="tel:5155126934"
            className="hidden md:flex items-center gap-2 text-spring-green font-semibold hover:text-white transition-colors"
            style={{ fontFamily: "Space Mono, monospace", fontSize: 13 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M2.5 1.5C2.5 1.5 1 1.5 1 3C1 4.5 1.5 7 4.5 10C7.5 13 10 13.5 11.5 13.5C13 13.5 13 12 13 12L11.5 9.5L9.5 10.5C9.5 10.5 8 9.5 6.5 8C5 6.5 4 5 4 5L5 3L2.5 1.5Z" />
            </svg>
            (515) 512-6934
          </a>
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap gap-2">
          {TRUST_CHIPS.map((chip) => (
            <span
              key={chip}
              className="glass rounded-full px-4 py-1.5 label-caps text-on-surface"
              style={{ fontSize: 10, color: "#9da39d" }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
      >
        <span className="label-caps text-muted-foreground" style={{ color: "#4a504a", fontSize: 9 }}>SCROLL</span>
        <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-1.5 rounded-full bg-spring-green"
            style={{ animation: "scrollDot 1.6s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* ── Scroll dot animation ── */}
      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
