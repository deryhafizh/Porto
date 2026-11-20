import { useState, useRef, useEffect, useCallback } from "react";
import {
  Code2,
  Sparkles,
  GitBranch,
  Volume2,
  Layers,
  Maximize2,
  Minimize2,
  Terminal,
  Activity,
  Cpu,
} from "lucide-react";
import { useSound } from "@/hooks/use-sound";

/**
 * 3D Isometric Floating Mockup / Layered Exploded-View UI Showcase
 * Inspired by the 3D isometric interface showcase in https://youtube.com/shorts/yVXsS59LYJ0
 * 
 * Features:
 * - Real-time cursor 3D parallax tilt (smooth spring-damping)
 * - Multi-layered Z-space exploded cards with dynamic elevation shadows
 * - Toggleable "3D Exploded View" vs "Flat 2D View" morph transition
 * - Dappled sunlight / gobo ambient lighting effect
 * - Procedural sound engine integration on hover and card selection
 * - 100% pure React + CSS 3D transforms (60 FPS GPU-accelerated)
 */
export function IsometricShowcase() {
  const { playHover, playClick } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Rotation angles
  const [rotate, setRotate] = useState({ x: 18, y: -16 });
  const [targetRotate, setTargetRotate] = useState({ x: 18, y: -16 });
  const [isExploded, setIsExploded] = useState(true);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Smooth spring-like lerp loop for cursor tilt
  useEffect(() => {
    let animId: number;
    const lerp = () => {
      setRotate((prev) => ({
        x: prev.x + (targetRotate.x - prev.x) * 0.1,
        y: prev.y + (targetRotate.y - prev.y) * 0.1,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetRotate]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Base isometric tilt + cursor tilt range
      const baseTiltX = isExploded ? 20 : 0;
      const baseTiltY = isExploded ? -18 : 0;

      setTargetRotate({
        x: baseTiltX - y * 28,
        y: baseTiltY + x * 32,
      });
    },
    [isExploded]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTargetRotate({
      x: isExploded ? 20 : 0,
      y: isExploded ? -18 : 0,
    });
  }, [isExploded]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const toggleViewMode = () => {
    playClick();
    const nextMode = !isExploded;
    setIsExploded(nextMode);
    setTargetRotate({
      x: nextMode ? 20 : 0,
      y: nextMode ? -18 : 0,
    });
  };

  return (
    <section className="relative overflow-hidden border-b border-border/60 py-16 sm:py-20 bg-background/50">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-primary/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary uppercase tracking-wider">
              <Sparkles className="h-3 w-3" /> 3D Exploded Showcase
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Eksplorasi Antarmuka 3D Isometrik
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Arahkan kursor untuk memutar sudut pandang 3D dan sentuh layer kartu untuk melihat arsitektur antarmuka.
            </p>
          </div>

          {/* Mode Switcher Button */}
          <button
            type="button"
            onClick={toggleViewMode}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-xs transition-colors hover:border-primary/50 hover:bg-accent active:scale-95 cursor-pointer select-none self-start sm:self-auto"
            title="Beralih antara mode 3D Exploded View dan 2D Flat"
          >
            <Layers className="h-4 w-4 text-primary" />
            <span>{isExploded ? "Mode: 3D Exploded View" : "Mode: 2D Flat Layout"}</span>
            {isExploded ? (
              <Minimize2 className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* 3D Perspective Stage Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1200px" }}
          className="relative min-h-[460px] sm:min-h-[520px] w-full flex items-center justify-center rounded-3xl border border-border/80 bg-gradient-to-b from-card/80 to-background/90 p-6 sm:p-12 shadow-xl backdrop-blur-sm overflow-hidden select-none cursor-grab active:cursor-grabbing"
        >
          {/* Gobo / Dappled sunlight lighting pattern overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.8) 0%, transparent 40%), radial-gradient(circle at 75% 60%, rgba(224,159,62,0.4) 0%, transparent 50%)",
            }}
          />

          {/* 3D Transform Space */}
          <div
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(0.92, 0.92, 0.92)`,
              transition: isHovering ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="relative w-full max-w-xl h-[320px] sm:h-[360px]"
          >
            {/* Tablet / Browser Mockup Base Plane (Z: 0px) */}
            <div
              style={{
                transform: "translateZ(0px)",
                boxShadow: "0 30px 60px -15px rgba(36, 27, 23, 0.25), 0 0 40px rgba(194, 94, 48, 0.12)",
              }}
              className="absolute inset-0 rounded-2xl border border-border/90 bg-card p-5 sm:p-6 transition-all duration-500"
            >
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground">deryhafizh.dev / workspace</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[10px] text-muted-foreground uppercase">System Live</span>
                </div>
              </div>

              {/* Base Grid Content (Subtle Wireframe Lines) */}
              <div className="mt-4 grid grid-cols-3 gap-3 opacity-30">
                <div className="h-24 rounded-lg border border-dashed border-border bg-muted/40" />
                <div className="h-24 rounded-lg border border-dashed border-border bg-muted/40" />
                <div className="h-24 rounded-lg border border-dashed border-border bg-muted/40" />
              </div>

              {/* Bottom Metadata bar */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-border/50 pt-2.5">
                <span>UI Architecture · React 19 + TanStack</span>
                <span className="text-primary font-bold">Z-Depth: {isExploded ? "Active (140px)" : "Collapsed"}</span>
              </div>
            </div>

            {/* FLOATING LAYER 1: Core Shell & Terminal (Z: 40px in Exploded Mode) */}
            <div
              onMouseEnter={() => {
                playHover();
                setActiveCard(1);
              }}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => {
                playClick();
                setActiveCard(1);
              }}
              style={{
                transform: `translate3d(15px, 20px, ${isExploded ? (activeCard === 1 ? 75 : 45) : 0}px)`,
                boxShadow: isExploded
                  ? "0 20px 40px -10px rgba(0,0,0,0.22), 0 0 15px rgba(194,94,48,0.15)"
                  : "0 4px 10px rgba(0,0,0,0.06)",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease",
              }}
              className={`absolute top-10 left-4 sm:left-6 w-60 sm:w-68 rounded-xl border p-3.5 backdrop-blur-md cursor-pointer ${
                activeCard === 1
                  ? "border-primary bg-card/95 ring-2 ring-primary/40"
                  : "border-border/80 bg-card/90 hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Terminal className="h-3.5 w-3.5 text-caramel" />
                <span>Runtime Terminal</span>
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[9px] text-primary">
                  Node v26
                </span>
              </div>
              <div className="mt-2 font-mono text-[11px] text-muted-foreground leading-relaxed">
                <p className="text-caramel">&gt; init dery.portfolio()</p>
                <p className="text-foreground/90">✓ Nitro Cloudflare module</p>
                <p className="text-foreground/90">✓ Vitest 100% passed</p>
              </div>
            </div>

            {/* FLOATING LAYER 2: Live Activity & GitHub Card (Z: 85px in Exploded Mode) */}
            <div
              onMouseEnter={() => {
                playHover();
                setActiveCard(2);
              }}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => {
                playClick();
                setActiveCard(2);
              }}
              style={{
                transform: `translate3d(140px, 95px, ${isExploded ? (activeCard === 2 ? 120 : 85) : 0}px)`,
                boxShadow: isExploded
                  ? "0 25px 48px -12px rgba(0,0,0,0.28), 0 0 20px rgba(224,159,62,0.2)"
                  : "0 4px 10px rgba(0,0,0,0.06)",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease",
              }}
              className={`absolute top-8 right-4 sm:right-10 w-64 sm:w-72 rounded-xl border p-4 backdrop-blur-md cursor-pointer ${
                activeCard === 2
                  ? "border-honey bg-card/95 ring-2 ring-honey/40"
                  : "border-border/80 bg-card/90 hover:border-honey/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-honey/15 text-honey">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-foreground">GitHub Pulse</h4>
                    <p className="font-mono text-[10px] text-muted-foreground">@deryhafizh</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Active
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2.5 font-mono text-xs">
                <span className="text-muted-foreground">Push Events</span>
                <span className="font-bold text-primary">Live Sync</span>
              </div>
            </div>

            {/* FLOATING LAYER 3: Web Audio Synth Card (Z: 125px in Exploded Mode) */}
            <div
              onMouseEnter={() => {
                playHover();
                setActiveCard(3);
              }}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => {
                playClick();
                setActiveCard(3);
              }}
              style={{
                transform: `translate3d(30px, 180px, ${isExploded ? (activeCard === 3 ? 160 : 125) : 0}px)`,
                boxShadow: isExploded
                  ? "0 30px 55px -14px rgba(0,0,0,0.32), 0 0 25px rgba(194,94,48,0.25)"
                  : "0 4px 10px rgba(0,0,0,0.06)",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease",
              }}
              className={`absolute bottom-6 left-8 sm:left-12 w-64 sm:w-72 rounded-xl border p-3.5 backdrop-blur-md cursor-pointer ${
                activeCard === 3
                  ? "border-primary bg-card/95 ring-2 ring-primary/40"
                  : "border-border/80 bg-card/90 hover:border-primary/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-bold text-foreground">Procedural Web Audio</span>
                <span className="ml-auto font-mono text-[10px] text-caramel font-semibold">0 KB Asset</span>
              </div>
              <div className="mt-2.5 flex items-center gap-1 h-4">
                <span className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
                <span className="w-1.5 h-4 bg-latte rounded-full animate-pulse delay-75" />
                <span className="w-1.5 h-2 bg-honey rounded-full animate-pulse delay-150" />
                <span className="w-1.5 h-3.5 bg-primary rounded-full animate-pulse" />
                <span className="w-1.5 h-2 bg-latte rounded-full animate-pulse delay-100" />
                <span className="ml-2 font-mono text-[10px] text-muted-foreground">Sine / Triangle Wave Synthesizer</span>
              </div>
            </div>

            {/* FLOATING LAYER 4: Tech Stack Badge Chip (Z: 145px in Exploded Mode) */}
            <div
              onMouseEnter={() => {
                playHover();
                setActiveCard(4);
              }}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => {
                playClick();
                setActiveCard(4);
              }}
              style={{
                transform: `translate3d(240px, 200px, ${isExploded ? (activeCard === 4 ? 180 : 145) : 0}px)`,
                boxShadow: isExploded
                  ? "0 25px 50px -10px rgba(0,0,0,0.3), 0 0 20px rgba(224,159,62,0.3)"
                  : "0 4px 10px rgba(0,0,0,0.06)",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease",
              }}
              className={`absolute bottom-4 right-6 sm:right-12 rounded-xl border p-2.5 backdrop-blur-md cursor-pointer ${
                activeCard === 4
                  ? "border-honey bg-card/95 ring-2 ring-honey/40"
                  : "border-border/80 bg-card/90 hover:border-honey/60"
              }`}
            >
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-foreground">
                <Cpu className="h-3.5 w-3.5 text-honey" />
                <span>Tailwind CSS v4 + Motion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Caption info below 3D stage */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <span className="font-mono text-[11px]">
            💡 Tip: Gerakkan kursor di atas canvas untuk mengontrol sudut perspektif 3D secara dinamis.
          </span>
          <span className="font-mono text-[11px] text-caramel">
            Gaya: 3D Exploded-Layer View (Figma &amp; TIDY Inspired)
          </span>
        </div>
      </div>
    </section>
  );
}
