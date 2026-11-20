import { useEffect, useState } from "react";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { useSound } from "@/hooks/use-sound";
import { btnPrimary } from "./ui";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { soundEnabled, toggleSound, playHover, playClick } = useSound();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Track active section in viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const observedIds = [...navLinks.map((l) => l.href.slice(1)), "connect"];
    observedIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const [a, b] = profile.brand.split(".");

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${open ? "border-b border-border bg-background" : scrolled ? "border-b border-border/50 bg-background/85 backdrop-blur-md glass-shadow" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5" aria-label="Utama">
        <a
          href="#home"
          onMouseEnter={playHover}
          onClick={playClick}
          className="group font-display text-lg font-extrabold tracking-wide transition-colors duration-150 hover:text-primary active:scale-95 cursor-pointer select-none"
        >
          {a}<span className="inline-block text-primary">.</span>{b}
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => {
            const current = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  aria-current={current ? "true" : undefined}
                  className={`link-line pb-0.5 text-sm transition-colors duration-150 hover:text-foreground cursor-pointer ${current ? "text-primary font-bold" : "text-muted-foreground"}`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              toggleSound();
            }}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/70 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:border-primary/50 hover:text-foreground active:scale-95 cursor-pointer select-none"
            title={soundEnabled ? "Nonaktifkan efek suara" : "Aktifkan efek suara interaktif"}
            aria-label={soundEnabled ? "Suara aktif" : "Suara nonaktif"}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-primary animate-pulse" />
                <span className="font-mono text-[11px] font-semibold text-primary">Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 opacity-60" />
                <span className="font-mono text-[11px] opacity-70">Sound Off</span>
              </>
            )}
          </button>
          <a
            href="#connect"
            onMouseEnter={playHover}
            onClick={playClick}
            className={`${btnPrimary} !px-4 !py-1.5 max-md:!hidden ${active === "connect" ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
          >
            Mari Terhubung
          </a>
          <button
            className="rounded-md p-2 text-muted-foreground transition-colors duration-150 hover:text-foreground active:scale-95 cursor-pointer md:hidden"
            onClick={() => {
              playClick();
              setOpen(!open);
            }}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5 animate-in spin-in-90 duration-300" /> : <Menu className="h-5 w-5 animate-in fade-in duration-300" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-300 md:hidden">
          <ul className="flex flex-col py-2">
            {navLinks.map((l, i) => (
              <li key={l.href} className="animate-in fade-in slide-in-from-left-3 fill-mode-both duration-500" style={{ animationDelay: `${i * 45}ms` }}>
                <a
                  href={l.href}
                  onClick={() => {
                    playClick();
                    setOpen(false);
                  }}
                  className={`block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-accent active:scale-98 ${active === l.href.slice(1) ? "font-bold text-primary" : ""}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#connect"
            onClick={() => {
              playClick();
              setOpen(false);
            }}
            className={`${btnPrimary} w-full justify-center active:scale-98`}
          >
            Mari Terhubung
          </a>
        </div>
      )}
      {/* Scroll reading progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-primary via-latte to-honey transition-all duration-100 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />
    </header>
  );
}
