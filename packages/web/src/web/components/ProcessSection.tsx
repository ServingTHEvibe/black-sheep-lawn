import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Request a Quote",
    desc: "Fill out our quick form or call us directly. Tell us your address, what you need, and when. We'll respond within 24–48 hours.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 10H20M8 14H16M8 18H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    cta: "Request now →",
  },
  {
    num: "02",
    title: "We Assess Your Lawn",
    desc: "A Black Sheep crew member visits your property, identifies what your lawn needs, and builds a tailored service plan.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 5V3M14 25V23M5 14H3M25 14H23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    cta: null,
  },
  {
    num: "03",
    title: "Your Yard Gets Handled",
    desc: "We show up on schedule, execute with precision, and leave your property looking premium. Every single time.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 14L11 19L22 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    cta: null,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Animate the connecting line
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, duration: 1.6, ease: "power2.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
        }
      );

      // Step cards stagger
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(step,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-gap max-w-[1280px] mx-auto px-5 md:px-16"
    >
      {/* Heading */}
      <div ref={headRef} className="text-center mb-20">
        <p className="label-caps text-spring-green mb-4" style={{ fontSize: 10 }}>How It Works</p>
        <h2
          className="font-black leading-none tracking-tight"
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "clamp(40px, 5.5vw, 72px)",
            letterSpacing: "-0.04em",
          }}
        >
          THREE STEPS TO
          <br />
          <span className="text-gradient-green">A PERFECT YARD.</span>
        </h2>
      </div>

      {/* Timeline — desktop */}
      <div className="hidden md:block relative">
        {/* Connecting line */}
        <div
          className="absolute top-12 left-[calc(50%-1px)] w-0.5 bottom-12"
          style={{ background: "rgba(255,255,255,0.06)", zIndex: 0 }}
        />
        <div
          ref={lineRef}
          className="absolute top-12 left-[calc(50%-1px)] w-0.5 bottom-12"
          style={{
            background: "linear-gradient(to bottom, #c1ff72 0%, rgba(193,255,114,0.3) 100%)",
            zIndex: 1,
            transformOrigin: "top",
          }}
        />

        {STEPS.map((step, i) => (
          <div
            key={step.num}
            ref={(el) => { stepsRef.current[i] = el; }}
            className={`relative flex items-center gap-12 mb-16 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          >
            {/* Card */}
            <div className="flex-1">
              <div
                className="glass rounded-2xl p-8 md:p-10 hover:border-spring-green/20 transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-spring-green mb-6"
                  style={{ background: "rgba(193,255,114,0.08)", border: "1px solid rgba(193,255,114,0.15)" }}
                >
                  {step.icon}
                </div>

                <div className="label-caps text-muted-foreground mb-3" style={{ fontSize: 10 }}>
                  Step {step.num}
                </div>
                <h3
                  className="font-bold text-on-surface mb-4"
                  style={{ fontFamily: "Sora", fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.03em" }}
                >
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontSize: 15 }}>
                  {step.desc}
                </p>
                {step.cta && (
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="label-caps text-spring-green hover:text-white transition-colors"
                    style={{ fontSize: 10 }}
                  >
                    {step.cta}
                  </button>
                )}
              </div>
            </div>

            {/* Center node */}
            <div className="flex-none relative z-10">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-black"
                style={{
                  background: "#c1ff72",
                  color: "#070906",
                  fontFamily: "Space Mono, monospace",
                  fontSize: 11,
                  boxShadow: "0 0 20px rgba(193,255,114,0.4)",
                }}
              >
                {step.num}
              </div>
            </div>

            {/* Spacer on other side */}
            <div className="flex-1" />
          </div>
        ))}
      </div>

      {/* Mobile stacked */}
      <div className="md:hidden flex flex-col gap-6">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            ref={(el) => { stepsRef.current[i] = el; }}
            className="glass rounded-2xl p-7"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-black flex-none"
                style={{
                  background: "#c1ff72",
                  color: "#070906",
                  fontFamily: "Space Mono, monospace",
                  fontSize: 11,
                }}
              >
                {step.num}
              </div>
              <h3
                className="font-bold text-on-surface"
                style={{ fontFamily: "Sora", fontSize: 18, letterSpacing: "-0.02em" }}
              >
                {step.title}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 14 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
