import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── BEFORE / AFTER SECTION ───────────────────────────────────────────────────
// REPLACE: swap the gradient placeholders with real before/after photos.
// Each card has:  beforeBg, afterBg (CSS gradient or image URL)
// To use images: set bg to `url('/images/lawn-before-1.jpg') center/cover`
// ─────────────────────────────────────────────────────────────────────────────

const TRANSFORMATIONS = [
  {
    title: "Bald Spot Brought Back",
    location: "Waterbury, Des Moines",
    tag: "Overseeding + Repair",
    beforeBg: "linear-gradient(135deg, #3a2a0a 0%, #1e1a0a 100%)",
    afterBg: "linear-gradient(135deg, #0d2008 0%, #091405 100%)",
    beforeLabel: "Patchy & dry",
    afterLabel: "Full & lush",
  },
  {
    title: "Stripe Path Refreshed",
    location: "West Des Moines",
    tag: "Premium Mowing",
    beforeBg: "linear-gradient(135deg, #1e2210 0%, #141808 100%)",
    afterBg: "linear-gradient(135deg, #0a1e07 0%, #061205 100%)",
    beforeLabel: "Uneven growth",
    afterLabel: "Crisp stripes",
  },
  {
    title: "Overgrown Tamed",
    location: "Ankeny, IA",
    tag: "Seasonal Cleanup",
    beforeBg: "linear-gradient(135deg, #2a3010 0%, #181e08 100%)",
    afterBg: "linear-gradient(135deg, #0c1e08 0%, #071406 100%)",
    beforeLabel: "Thick + tangled",
    afterLabel: "Clean & edged",
  },
  {
    title: "Full Revival",
    location: "Clive, IA",
    tag: "Full Treatment Plan",
    beforeBg: "linear-gradient(135deg, #3d2000 0%, #1e1000 100%)",
    afterBg: "linear-gradient(135deg, #0e2008 0%, #081406 100%)",
    beforeLabel: "Stressed & brown",
    afterLabel: "Vibrant & thick",
  },
  {
    title: "Edge Definition",
    location: "Urbandale, IA",
    tag: "Property Maintenance",
    beforeBg: "linear-gradient(135deg, #1e2018 0%, #10140a 100%)",
    afterBg: "linear-gradient(135deg, #0a1e06 0%, #061204 100%)",
    beforeLabel: "Blurry borders",
    afterLabel: "Razor edge",
  },
];

function BACard({ card }: { card: typeof TRANSFORMATIONS[0] }) {
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging.current) updatePos(e.clientX); };
  const onMouseUp = () => { isDragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => { updatePos(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="ba-slider flex-none cursor-ew-resize select-none"
      style={{ width: "clamp(300px, 40vw, 560px)", height: "clamp(220px, 28vw, 380px)" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* Before layer */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: card.beforeBg }}
      >
        {/* Stripe sim */}
        <div className="absolute inset-0 rounded-2xl" style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(120,80,20,0.08) 0px, rgba(120,80,20,0.08) 3px, transparent 3px, transparent 14px)"
        }} />
        <div className="absolute bottom-4 left-4">
          <span className="label-caps text-white/70 bg-black/40 rounded-full px-3 py-1 text-[9px]">BEFORE</span>
          <p className="text-white/80 mt-1.5 font-semibold" style={{ fontSize: 12 }}>{card.beforeLabel}</p>
        </div>
      </div>

      {/* After layer clipped */}
      <div
        className="ba-after rounded-2xl"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ background: card.afterBg }}
        >
          <div className="absolute inset-0 rounded-2xl" style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(30,100,20,0.12) 0px, rgba(30,100,20,0.12) 3px, transparent 3px, transparent 14px)"
          }} />
          <div className="absolute inset-0 rounded-2xl" style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(193,255,114,0.05) 0%, transparent 70%)"
          }} />
          <div className="absolute bottom-4 left-4">
            <span className="label-caps bg-spring-green text-[#070906] rounded-full px-3 py-1 text-[9px]">AFTER</span>
            <p className="text-spring-green mt-1.5 font-semibold" style={{ fontSize: 12 }}>{card.afterLabel}</p>
          </div>
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="ba-handle z-10"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      />

      {/* Card info overlay at top */}
      <div
        className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between pointer-events-none"
      >
        <div>
          <p
            className="font-bold text-white leading-tight"
            style={{ fontFamily: "Sora, sans-serif", fontSize: 15, letterSpacing: "-0.02em" }}
          >
            {card.title}
          </p>
          <p className="label-caps" style={{ fontSize: 9, color: "#8a8f88" }}>{card.location}</p>
        </div>
        <span
          className="label-caps rounded-full px-2.5 py-1 text-[9px]"
          style={{ background: "rgba(193,255,114,0.12)", color: "#c1ff72", border: "1px solid rgba(193,255,114,0.2)" }}
        >
          {card.tag}
        </span>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Horizontal scroll GSAP
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth + 80;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="transformations-gallery"
      style={{ overflow: "hidden" }}
    >
      <div className="section-gap max-w-[1280px] mx-auto px-5 md:px-16">
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <p className="label-caps text-spring-green mb-3" style={{ fontSize: 10 }}>Proof of Work</p>
            <h2
              className="font-black leading-none tracking-tight"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "clamp(36px, 5vw, 68px)",
                letterSpacing: "-0.04em",
              }}
            >
              REAL
              <br />
              <span className="text-gradient-green">TRANSFORMATIONS.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs" style={{ fontSize: 14 }}>
            Drag the slider on each card to see before & after. Scroll right to see more.
          </p>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-5 px-5 md:px-16 pb-8"
        style={{ width: "max-content" }}
      >
        {TRANSFORMATIONS.map((card) => (
          <BACard key={card.title} card={card} />
        ))}

        {/* End CTA card */}
        <div
          className="flex-none glass rounded-2xl flex flex-col items-center justify-center gap-4 p-10"
          style={{
            width: "clamp(240px, 24vw, 340px)",
            height: "clamp(220px, 28vw, 380px)",
            border: "1px solid rgba(193,255,114,0.2)",
          }}
        >
          <p className="font-black text-center" style={{ fontFamily: "Sora", fontSize: 20, letterSpacing: "-0.03em" }}>
            Your lawn could be next.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-spring-green text-[#070906] font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform label-caps"
            style={{ fontSize: 11 }}
          >
            Get Free Quote
          </button>
        </div>
      </div>
    </section>
  );
}
