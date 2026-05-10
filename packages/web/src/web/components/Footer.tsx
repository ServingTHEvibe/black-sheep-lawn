export default function Footer() {
  const links = ["Services", "Transformations", "Process", "Contact"];

  return (
    <footer
      className="border-t"
      style={{ background: "#040604", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Left: Brand */}
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-spring-green flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 14 C2 14 3.5 6 8 4 C12.5 2 14 8 14 8 C14 8 11.5 5 8 7 C4.5 9 3.5 14 3.5 14Z" fill="#070906"/>
              </svg>
            </div>
            <span className="font-black text-white" style={{ fontFamily: "Sora, sans-serif", fontSize: 16 }}>
              BLACK SHEEP
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 13 }}>
            Premium lawn care and landscaping in Des Moines, Iowa.
            Built different. Done right.
          </p>
          <a
            href="tel:5155126934"
            className="inline-flex items-center gap-2 font-bold text-spring-green hover:text-white transition-colors"
            style={{ fontFamily: "Space Mono, monospace", fontSize: 14 }}
          >
            (515) 512-6934
          </a>
        </div>

        {/* Center: Nav */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="label-caps text-muted-foreground hover:text-on-surface transition-colors"
              style={{ fontSize: 10 }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right: CTA + legal */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-spring-green text-[#070906] font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform label-caps"
            style={{ fontSize: 11 }}
          >
            Get Free Quote
          </button>
          <p className="label-caps text-muted-foreground" style={{ fontSize: 9 }}>
            © {new Date().getFullYear()} Black Sheep Lawn Care. Des Moines, IA.
          </p>
        </div>
      </div>
    </footer>
  );
}
