import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { val: "5★", label: "Google Rating", sub: "100+ reviews" },
  { val: "48h", label: "Response Time", sub: "Or next day" },
  { val: "3+", label: "Years Local", sub: "Des Moines, IA" },
  { val: "∞", label: "Satisfaction", sub: "Guaranteed" },
];

const PILLARS = [
  {
    num: "01",
    title: "Local Des Moines Crew",
    desc: "We live and work here. We know Iowa seasons, soil conditions, and what it takes to keep a lawn looking great all year.",
    icon: "📍",
  },
  {
    num: "02",
    title: "Detail-Focused Service",
    desc: "We don't cut corners — literally. Every edge, every stripe, every hard surface blowdown is included in every visit.",
    icon: "🎯",
  },
  {
    num: "03",
    title: "Clean Edges & Stripes",
    desc: "Our signature striping and precision edging gives your property a professionally landscaped look that lasts.",
    icon: "⚡",
  },
  {
    num: "04",
    title: "Curb Appeal That Pays Off",
    desc: "A well-maintained lawn increases property value and makes your home the standout on the block — every time.",
    icon: "🏡",
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Big headline reveal
      gsap.fromTo(headRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Stats stagger
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        gsap.fromTo(statItems,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
            scrollTrigger: { trigger: statsRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }

      // Pillar cards
      const pillarItems = pillarsRef.current?.querySelectorAll(".pillar-item");
      if (pillarItems) {
        gsap.fromTo(pillarItems,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: pillarsRef.current, start: "top 78%", toggleActions: "play none none none" },
          }
        );
      }

      // Big background text parallax
      gsap.to(bigTextRef.current, {
        x: "8%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="section-gap relative overflow-hidden"
      style={{ background: "#0a0d0a" }}
    >
      {/* Big background text */}
      <div
        ref={bigTextRef}
        className="absolute inset-0 flex items-center pointer-events-none overflow-hidden select-none"
        style={{ zIndex: 0 }}
      >
        <span
          className="font-black text-white/[0.025] whitespace-nowrap"
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(80px, 15vw, 200px)",
            letterSpacing: "-0.05em",
            transform: "translateX(-5%)",
          }}
        >
          BLACK SHEEP LAWN CARE
        </span>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-16">
        {/* Header */}
        <div ref={headRef} className="mb-20">
          <p className="label-caps text-spring-green mb-4" style={{ fontSize: 10 }}>Why Black Sheep</p>
          <h2
            className="font-black leading-none tracking-tight"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(44px, 6vw, 80px)",
              letterSpacing: "-0.04em",
              maxWidth: 700,
            }}
          >
            WE DON'T JUST
            <br />
            MOW GRASS.
            <br />
            <span className="text-gradient-green">WE BUILD YARDS.</span>
          </h2>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-24"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="stat-item glass rounded-2xl p-8 flex flex-col gap-2"
            >
              <span
                className="stat-number text-gradient-green"
                style={{ fontFamily: "Sora", fontWeight: 900 }}
              >
                {s.val}
              </span>
              <p className="text-on-surface font-bold" style={{ fontFamily: "Sora", fontSize: 16, letterSpacing: "-0.02em" }}>
                {s.label}
              </p>
              <p className="label-caps text-muted-foreground" style={{ fontSize: 9 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PILLARS.map((p) => (
            <div
              key={p.num}
              className="pillar-item flex items-start gap-6 glass rounded-2xl p-8 hover:border-spring-green/20 transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Number */}
              <div
                className="flex-none w-12 h-12 rounded-xl flex items-center justify-center font-black label-caps"
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: 11,
                  color: "#c1ff72",
                  background: "rgba(193,255,114,0.08)",
                  border: "1px solid rgba(193,255,114,0.15)",
                }}
              >
                {p.num}
              </div>
              <div>
                <h3
                  className="font-bold text-on-surface mb-3"
                  style={{ fontFamily: "Sora, sans-serif", fontSize: 18, letterSpacing: "-0.02em" }}
                >
                  {p.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 14 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ background: "rgba(193,255,114,0.05)", border: "1px solid rgba(193,255,114,0.15)" }}
        >
          <div>
            <p
              className="font-black text-on-surface mb-2"
              style={{ fontFamily: "Sora", fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.03em" }}
            >
              Ready to see the difference?
            </p>
            <p className="text-muted-foreground" style={{ fontSize: 14 }}>
              We only take on a limited number of new clients each season.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-none">
            <a
              href="tel:5155126934"
              className="glass flex items-center gap-2 font-bold px-6 py-4 rounded-full hover:bg-white/10 transition-all label-caps"
              style={{ fontSize: 11, color: "#c1ff72" }}
            >
              ☎ (515) 512-6934
            </a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-spring-green text-[#070906] font-bold px-8 py-4 rounded-full hover:scale-105 hover:brightness-110 transition-all label-caps"
              style={{ fontSize: 11 }}
            >
              Get Free Quote →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
