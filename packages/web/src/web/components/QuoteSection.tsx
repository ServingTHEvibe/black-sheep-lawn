import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_LIST = [
  "Lawn Mowing",
  "Lawn Striping",
  "Overseeding",
  "Lawn Repair",
  "Seasonal Cleanup",
  "Property Maintenance",
  "Full Lawn Transformation",
  "Other / Not Sure",
];

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", phone: "", address: "", service: "", message: "",
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — replace with actual API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-gap relative overflow-hidden"
      style={{ background: "#070906" }}
    >
      {/* Glow blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%", right: "-10%",
          width: 500, height: 500,
          borderRadius: "9999px",
          background: "radial-gradient(circle, rgba(193,255,114,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%", left: "-8%",
          width: 400, height: 400,
          borderRadius: "9999px",
          background: "radial-gradient(circle, rgba(62,78,62,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-16">
        {/* Big headline */}
        <div ref={headRef} className="text-center mb-20">
          <p className="label-caps text-spring-green mb-4" style={{ fontSize: 10 }}>Get Started</p>
          <h2
            className="font-black leading-none tracking-tight mb-6"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(42px, 6.5vw, 88px)",
              letterSpacing: "-0.04em",
            }}
          >
            READY FOR A LAWN
            <br />
            <span className="text-gradient-green">THAT STANDS OUT?</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto" style={{ fontSize: 16 }}>
            We only take on a limited number of new clients each season to maintain
            our quality standards. Secure your spot today.
          </p>

          {/* Click to call */}
          <a
            href="tel:5155126934"
            className="inline-flex items-center gap-3 mt-8 glass rounded-full px-6 py-3 hover:bg-white/10 transition-all group"
          >
            <div
              className="w-9 h-9 rounded-full bg-spring-green flex items-center justify-center flex-none group-hover:scale-110 transition-transform"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#070906">
                <path d="M2.5 1.5C2.5 1.5 1 1.5 1 3C1 4.5 1.5 7 4.5 10C7.5 13 10 13.5 11.5 13.5C13 13.5 13 12 13 12L11.5 9.5L9.5 10.5C9.5 10.5 8 9.5 6.5 8C5 6.5 4 5 4 5L5 3L2.5 1.5Z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="label-caps text-muted-foreground" style={{ fontSize: 9 }}>Click to call</p>
              <p className="font-bold text-on-surface" style={{ fontFamily: "Sora", fontSize: 18, letterSpacing: "-0.02em" }}>
                (515) 512-6934
              </p>
            </div>
          </a>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div
              className="glass rounded-3xl p-14 text-center"
              style={{ border: "1px solid rgba(193,255,114,0.3)" }}
            >
              <div
                className="w-16 h-16 rounded-full bg-spring-green flex items-center justify-center mx-auto mb-6"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="#070906">
                  <path d="M6 14L11 19L22 9" strokeWidth="2.5" stroke="#070906" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3
                className="font-black text-on-surface mb-3"
                style={{ fontFamily: "Sora", fontSize: 28, letterSpacing: "-0.03em" }}
              >
                Quote Request Sent!
              </h3>
              <p className="text-muted-foreground mb-6" style={{ fontSize: 15 }}>
                We'll reach out within 24–48 hours with your custom quote.
                Or call us directly at{" "}
                <a href="tel:5155126934" className="text-spring-green">(515) 512-6934</a>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="label-caps text-spring-green hover:text-white transition-colors"
                style={{ fontSize: 10 }}
              >
                Submit another request →
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 md:p-12 flex flex-col gap-6"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label-caps text-muted-foreground block mb-2" style={{ fontSize: 9 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    className="bs-input"
                  />
                </div>
                <div>
                  <label className="label-caps text-muted-foreground block mb-2" style={{ fontSize: 9 }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(515) 555-0000"
                    className="bs-input"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="label-caps text-muted-foreground block mb-2" style={{ fontSize: 9 }}>
                  Property Address *
                </label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="123 Main St, Des Moines, IA"
                  className="bs-input"
                />
              </div>

              {/* Service */}
              <div>
                <label className="label-caps text-muted-foreground block mb-2" style={{ fontSize: 9 }}>
                  Service Needed *
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES_LIST.map((svc) => (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => setForm({ ...form, service: svc })}
                      className="label-caps px-3.5 py-2 rounded-full transition-all"
                      style={{
                        fontSize: 10,
                        background: form.service === svc ? "#c1ff72" : "rgba(255,255,255,0.05)",
                        color: form.service === svc ? "#070906" : "#8a8f88",
                        border: form.service === svc ? "1px solid #c1ff72" : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {svc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="label-caps text-muted-foreground block mb-2" style={{ fontSize: 9 }}>
                  Additional Notes
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your lawn — size, condition, specific concerns..."
                  rows={4}
                  className="bs-input resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-5 rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-[0.99] disabled:opacity-80"
                style={{
                  background: loading ? "rgba(193,255,114,0.7)" : "#c1ff72",
                  color: "#070906",
                  fontFamily: "Sora, sans-serif",
                  fontSize: 18,
                  letterSpacing: "-0.02em",
                  boxShadow: "0 0 30px rgba(193,255,114,0.2)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#070906" strokeWidth="2" strokeDasharray="25" strokeDashoffset="10"/>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Request My Free Quote →"
                )}
              </button>

              <p className="label-caps text-center text-muted-foreground" style={{ fontSize: 9 }}>
                No spam. No pressure. We'll respond within 24–48 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
