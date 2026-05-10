import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="11" width="22" height="10" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="8" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="20" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 11V7M14 11V5M20 11V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Lawn Mowing",
    desc: "Precision cuts at the perfect 3.5\" height for a healthy, uniform finish every single visit.",
    tag: "Weekly / Bi-Weekly",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22 L14 6 L24 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M4 16 L14 10 L24 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M4 19 L14 13 L24 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Lawn Striping",
    desc: "Signature diagonal stripe patterns that make your yard look like a professional sports field.",
    tag: "Signature Service",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 4V6M14 22V24M4 14H6M22 14H24M6.9 6.9L8.3 8.3M19.7 19.7L21.1 21.1M6.9 21.1L8.3 19.7M19.7 8.3L21.1 6.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Overseeding",
    desc: "Fill in bare patches and thicken thinning turf with Des Moines climate-optimized seed blends.",
    tag: "Spring / Fall",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C14 4 6 10 6 17C6 21.4 9.6 25 14 25C18.4 25 22 21.4 22 17C22 10 14 4 14 4Z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 12V18M11 15H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Lawn Repair",
    desc: "Revive stressed, damaged, or patchy areas with targeted treatment and professional care protocols.",
    tag: "On-Demand",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 21L10 15L14 19L19 11L24 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 25H23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M14 7V3M10 8L8 5M18 8L20 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Seasonal Cleanups",
    desc: "Spring & fall debris removal, leaf management, and edging to keep your property crisp year-round.",
    tag: "Spring & Fall",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9 14H19M9 10H14M9 18H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="20" cy="8" r="3" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
    title: "Property Maintenance",
    desc: "Year-round care plans covering edging, trimming, hard surface cleanup, and seasonal transitions.",
    tag: "Year-Round",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll(".service-card");
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Tilt effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-gap max-w-[1280px] mx-auto px-5 md:px-16"
    >
      {/* Heading */}
      <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div>
          <p className="label-caps text-spring-green mb-3" style={{ fontSize: 10 }}>What We Do</p>
          <h2
            className="font-black leading-none tracking-tight"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              letterSpacing: "-0.04em",
            }}
          >
            ELITE LAWN
            <br />
            <span className="text-gradient-green">SERVICES.</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 15 }}>
            Every blade matters. From weekly cuts to full-property transformations — we handle your yard like it's our own.
          </p>
          <a
            href="tel:5155126934"
            className="inline-flex items-center gap-2 mt-4 text-spring-green font-semibold label-caps hover:text-white transition-colors"
            style={{ fontSize: 10 }}
          >
            Call (515) 512-6934 →
          </a>
        </div>
      </div>

      {/* Cards grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((svc, i) => (
          <div
            key={svc.title}
            className="service-card glass rounded-2xl p-8 flex flex-col gap-5 cursor-default"
            style={{
              transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.2s",
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 1px rgba(193,255,114,0.25), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(193,255,114,0.07)";
            }}
          >
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-spring-green"
              style={{ background: "rgba(193,255,114,0.08)", border: "1px solid rgba(193,255,114,0.15)" }}
            >
              {svc.icon}
            </div>

            {/* Tag */}
            <span className="label-caps text-gold" style={{ fontSize: 9, color: "#bdba9e" }}>
              {svc.tag}
            </span>

            {/* Title */}
            <h3
              className="font-bold text-on-surface leading-tight"
              style={{ fontFamily: "Sora, sans-serif", fontSize: 21, letterSpacing: "-0.02em" }}
            >
              {svc.title}
            </h3>

            {/* Desc */}
            <p className="text-muted-foreground leading-relaxed flex-1" style={{ fontSize: 14 }}>
              {svc.desc}
            </p>

            {/* CTA micro-link */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="label-caps text-spring-green flex items-center gap-1 hover:gap-2 transition-all"
              style={{ fontSize: 10 }}
            >
              Get a quote
              <span style={{ display: "inline-block", transition: "transform 0.2s" }}>→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
