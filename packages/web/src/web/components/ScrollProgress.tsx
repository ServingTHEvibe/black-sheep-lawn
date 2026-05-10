import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          background: "linear-gradient(90deg, #c1ff72 0%, #86efac 100%)",
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}
