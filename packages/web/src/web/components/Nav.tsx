import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Nav() {
  const navRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.4 }
    );
  }, []);

  const links = ["Services", "Transformations", "Process", "Contact"];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop pill nav */}
      <div
        ref={navRef}
        className={`nav-pill hidden md:flex items-center gap-2 px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-2xl" : "glass"
        }`}
        style={{ opacity: 0 }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 mr-4 group"
        >
          <div className="w-7 h-7 rounded-full bg-spring-green flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12 C2 12 3 5 7 3 C11 1 12 7 12 7 C12 7 10 4 7 6 C4 8 3 12 3 12Z" fill="#070906"/>
            </svg>
          </div>
          <span className="font-bold text-sm text-white tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>BLACK SHEEP</span>
        </button>

        {/* Links */}
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="label-caps text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-white/5 transition-all"
          >
            {link}
          </button>
        ))}

        {/* CTA */}
        <a
          href="tel:5155126934"
          className="ml-2 label-caps bg-spring-green text-[#070906] font-bold px-5 py-2 rounded-full hover:scale-105 hover:brightness-110 transition-all"
          style={{ fontSize: 11 }}
        >
          (515) 512-6934
        </a>
        <button
          onClick={() => scrollTo("contact")}
          className="label-caps bg-white text-[#070906] font-bold px-5 py-2 rounded-full hover:scale-105 hover:bg-spring-green transition-all"
          style={{ fontSize: 11 }}
        >
          Free Quote
        </button>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-[1000] glass rounded-2xl flex items-center justify-between px-4 py-3">
        <span className="font-bold text-sm text-white" style={{ fontFamily: 'Sora, sans-serif' }}>BLACK SHEEP</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
        >
          <span className={`block h-0.5 w-5 bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 z-[999] glass-strong rounded-2xl p-6 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="label-caps text-left text-on-surface hover:text-spring-green transition-colors"
            >
              {link}
            </button>
          ))}
          <hr className="border-white/10" />
          <a href="tel:5155126934" className="label-caps text-spring-green">(515) 512-6934</a>
          <button
            onClick={() => scrollTo("contact")}
            className="label-caps bg-spring-green text-[#070906] font-bold px-5 py-3 rounded-xl text-center"
          >
            Get Free Quote
          </button>
        </div>
      )}
    </>
  );
}
