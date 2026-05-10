import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── SCROLL-CONTROLLED 3D HERO ────────────────────────────────────────────────
// This section pins while user scrolls through lawn transformation stages:
// Stage 1: Patchy, dry lawn
// Stage 2: Mower appears — cut begins
// Stage 3: Stripes emerge diagonally
// Stage 4: Final lush, perfectly striped yard
// REPLACE: swap the gradient placeholders with actual image sequence frames
// ─────────────────────────────────────────────────────────────────────────────

const STAGES = [
  {
    id: "stage-1",
    label: "01 / Before",
    caption: "Patchy, overgrown, neglected",
    bg: "linear-gradient(135deg, #3d2b0a 0%, #1a1a0e 40%, #2a2010 100%)",
    stripeOpacity: 0,
    overlayText: "Before",
    overlayColor: "#f0a060",
  },
  {
    id: "stage-2",
    label: "02 / Cut begins",
    caption: "Precision mowing underway",
    bg: "linear-gradient(135deg, #1a2e12 0%, #0e1a0a 40%, #1e2e12 100%)",
    stripeOpacity: 0.2,
    overlayText: "In Progress",
    overlayColor: "#c1ff72",
  },
  {
    id: "stage-3",
    label: "03 / Stripes emerge",
    caption: "Signature diagonal striping",
    bg: "linear-gradient(135deg, #0d2008 0%, #091408 40%, #152a10 100%)",
    stripeOpacity: 0.65,
    overlayText: "Taking Shape",
    overlayColor: "#c1ff72",
  },
  {
    id: "stage-4",
    label: "04 / After",
    caption: "Golf-course worthy, every visit",
    bg: "linear-gradient(135deg, #0a1e07 0%, #061205 40%, #0f2009 100%)",
    stripeOpacity: 1,
    overlayText: "After",
    overlayColor: "#c1ff72",
  },
];

function LawnStripes({ opacity }: { opacity: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity, transition: "opacity 0.4s ease" }}
    >
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: 0,
            bottom: 0,
            left: `${(i / 22) * 100}%`,
            width: `${100 / 22 / 2}%`,
            background: i % 2 === 0
              ? "rgba(60,100,40,0.35)"
              : "rgba(30,60,20,0.15)",
            transform: "skewX(-8deg)",
            transformOrigin: "top",
          }}
        />
      ))}
    </div>
  );
}

export default function ScrollHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);
  const mowerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stripeProgress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const stageRefs = [stage1Ref, stage2Ref, stage3Ref, stage4Ref];

      // Pin the sticky container for 4× viewport height of scroll
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=350%",
        pin: stickyRef.current,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // ── Stage transitions ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1,
        },
      });

      // Stage 1 → 2: patchy to mowing starts
      tl.to(stage1Ref.current, { opacity: 0, duration: 1 }, 0.8)
        .fromTo(stage2Ref.current, { opacity: 0 }, { opacity: 1, duration: 1 }, 0.8)

        // Mower sweeps left to right
        .fromTo(mowerRef.current,
          { x: "-15%", opacity: 0 },
          { x: "90%", opacity: 1, duration: 2, ease: "power2.inOut" }, 1
        )

        // Stage 2 → 3: stripes begin
        .to(stage2Ref.current, { opacity: 0, duration: 0.8 }, 2.5)
        .fromTo(stage3Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 2.5)
        .to(mowerRef.current, { opacity: 0, duration: 0.3 }, 2.5)

        // Stage 3 → 4: full reveal
        .to(stage3Ref.current, { opacity: 0, duration: 0.8 }, 4.2)
        .fromTo(stage4Ref.current, { opacity: 0 }, { opacity: 1, duration: 1 }, 4.2);

      // ── Background parallax ──
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1.2,
        },
      });

      // ── Progress bar ──
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 0.8,
        },
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="transformations"
      className="relative"
      style={{ height: "450vh" }}
    >
      {/* Sticky container */}
      <div
        ref={stickyRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* ── BG parallax layer ── */}
        <div ref={bgRef} className="absolute inset-0 will-change-transform" style={{ top: "-20%" }}>
          {/* Stage 1: Patchy / before */}
          <div
            ref={stage1Ref}
            className="absolute inset-0"
            style={{ background: STAGES[0].bg }}
          >
            <LawnStripes opacity={0} />
            {/* Patchy spots */}
            {[
              { top: "35%", left: "20%", w: 140, h: 90 },
              { top: "55%", left: "55%", w: 100, h: 70 },
              { top: "25%", left: "65%", w: 80, h: 60 },
            ].map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  top: s.top, left: s.left,
                  width: s.w, height: s.h,
                  background: "rgba(100,60,10,0.5)",
                  filter: "blur(18px)",
                }}
              />
            ))}
            {/* Grass texture sim */}
            <div className="absolute inset-0" style={{
              backgroundImage: "repeating-linear-gradient(0deg, rgba(40,70,20,0.1) 0px, rgba(40,70,20,0.1) 2px, transparent 2px, transparent 8px)",
            }} />
          </div>

          {/* Stage 2: Mowing starts */}
          <div
            ref={stage2Ref}
            className="absolute inset-0"
            style={{ background: STAGES[1].bg, opacity: 0 }}
          >
            <LawnStripes opacity={0.2} />
            <div className="absolute inset-0" style={{
              backgroundImage: "repeating-linear-gradient(0deg, rgba(60,100,30,0.12) 0px, rgba(60,100,30,0.12) 2px, transparent 2px, transparent 7px)",
            }} />
          </div>

          {/* Stage 3: Stripes emerging */}
          <div
            ref={stage3Ref}
            className="absolute inset-0"
            style={{ background: STAGES[2].bg, opacity: 0 }}
          >
            <LawnStripes opacity={0.65} />
          </div>

          {/* Stage 4: Final perfect lawn */}
          <div
            ref={stage4Ref}
            className="absolute inset-0"
            style={{ background: STAGES[3].bg, opacity: 0 }}
          >
            <LawnStripes opacity={1} />
            {/* Glow overlay */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(193,255,114,0.06) 0%, transparent 70%)",
            }} />
          </div>
        </div>

        {/* ── Mower ── */}
        <div
          ref={mowerRef}
          className="absolute z-20 opacity-0"
          style={{ top: "42%", left: 0, transform: "translateY(-50%)" }}
        >
          <div
            className="glass rounded-2xl px-5 py-3 flex items-center gap-3"
            style={{ border: "1px solid rgba(193,255,114,0.2)" }}
          >
            <div className="w-10 h-10 rounded-full bg-spring-green flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="7" width="16" height="7" rx="2" fill="#070906"/>
                <circle cx="5.5" cy="15.5" r="2" fill="#070906"/>
                <circle cx="14.5" cy="15.5" r="2" fill="#070906"/>
              </svg>
            </div>
            <div>
              <p className="label-caps text-spring-green" style={{ fontSize: 9 }}>ACTIVE</p>
              <p className="text-white font-bold" style={{ fontFamily: "Sora", fontSize: 13 }}>Precision Cut</p>
            </div>
          </div>
        </div>

        {/* ── Gradient overlay ── */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(7,9,6,0.7) 0%, rgba(7,9,6,0.15) 30%, rgba(7,9,6,0.15) 70%, rgba(7,9,6,0.85) 100%)",
          }}
        />

        {/* ── Content overlay ── */}
        <div className="relative z-[10] h-full flex flex-col justify-between px-5 md:px-16 max-w-[1280px] mx-auto pt-20 pb-12">
          {/* Top label */}
          <div className="flex items-center justify-between">
            <div>
              <p className="label-caps text-spring-green mb-1" style={{ fontSize: 10 }}>LAWN TRANSFORMATION</p>
              <p className="text-white font-bold" style={{ fontFamily: "Sora", fontSize: 18 }}>
                Scroll to see the difference
              </p>
            </div>

            {/* Stage dots */}
            <div className="hidden md:flex items-center gap-2">
              {STAGES.map((s, i) => (
                <div
                  key={s.id}
                  className="rounded-full transition-all"
                  style={{
                    width: 8, height: 8,
                    background: i === 0 ? "#c1ff72" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom info */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Stage label */}
            <div ref={labelRef}>
              <div className="glass rounded-2xl p-6 inline-block" style={{ minWidth: 240 }}>
                <p className="label-caps text-spring-green mb-2" style={{ fontSize: 9 }}>
                  {STAGES[0].label}
                </p>
                <p
                  ref={captionRef}
                  className="text-white font-bold"
                  style={{ fontFamily: "Sora", fontSize: 20, letterSpacing: "-0.02em" }}
                >
                  {STAGES[0].caption}
                </p>
                <p className="text-muted-foreground mt-2" style={{ fontSize: 13 }}>
                  Black Sheep Lawn Care
                </p>
              </div>
            </div>

            {/* Right stats */}
            <div className="flex gap-4">
              {[
                { val: "48hrs", label: "Response Time" },
                { val: "100%", label: "Satisfaction" },
                { val: "5★", label: "Google Rating" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center" style={{ minWidth: 90 }}>
                  <p className="font-black text-spring-green" style={{ fontFamily: "Sora", fontSize: 22, letterSpacing: "-0.03em" }}>
                    {stat.val}
                  </p>
                  <p className="label-caps text-muted-foreground mt-1" style={{ fontSize: 9 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[20] h-0.5 bg-white/5">
          <div
            ref={progressRef}
            className="h-full bg-spring-green origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
