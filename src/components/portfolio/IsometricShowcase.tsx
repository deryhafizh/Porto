import { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  Layers,
  Maximize2,
  Minimize2,
  Terminal,
  Activity,
  Cpu,
  GraduationCap,
  Coffee,
  Volume2,
} from "lucide-react";
import { useSound } from "@/hooks/use-sound";

/**
 * 3D Isometric Floating Architecture Showcase (Unboxed & Fluid)
 * 
 * Design Engineering principles:
 * - Unboxed: No rigid card borders or artificial mockup boxes trapping the 3D space
 * - Direct Manipulation: Fluid pointer tracking with spring-lerp damping (Apple Fluid Interfaces WWDC 2018)
 * - Multi-layered Z-space exploded cards with authentic elevation & contact shadows
 * - Seamless morph between 3D Spatial View and 2D Grid Layout
 * - Direct Web Audio micro-interactions
 */
export function IsometricShowcase() {
  const { playHover, playClick } = useSound();
  const stageRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // 3D Rotation angles
  const [rotate, setRotate] = useState({ x: 18, y: -16 });
  const [targetRotate, setTargetRotate] = useState({ x: 18, y: -16 });
  const [isExploded, setIsExploded] = useState(true);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Smooth spring-like lerp loop for 60fps rotation
  useEffect(() => {
    let animId: number;
    const lerp = () => {
      setRotate((prev) => {
        const dx = targetRotate.x - prev.x;
        const dy = targetRotate.y - prev.y;
        if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
          return targetRotate;
        }
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetRotate]);

  // Pointer move handler (mouse or touch drag)
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const baseTiltX = isExploded ? 18 : 0;
      const baseTiltY = isExploded ? -16 : 0;

      setTargetRotate({
        x: baseTiltX - y * 30,
        y: baseTiltY + x * 34,
      });
    },
    [isExploded]
  );

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsInteracting(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (isDraggingRef.current) return;
    setIsInteracting(false);
    setTargetRotate({
      x: isExploded ? 18 : 0,
      y: isExploded ? -16 : 0,
    });
  }, [isExploded]);

  const toggleViewMode = () => {
    playClick();
    const nextMode = !isExploded;
    setIsExploded(nextMode);
    setTargetRotate({
      x: nextMode ? 18 : 0,
      y: nextMode ? -16 : 0,
    });
  };

  return (
    <section className="relative overflow-visible py-16 sm:py-24 select-none">
      {/* Expansive Ambient Atmospheric Light (No rigid box borders) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[450px] bg-gradient-to-tr from-primary/15 via-honey/10 to-transparent rounded-full blur-[130px] pointer-events-none"
        aria-hidden
      />

      <div className="mx-auto max-w-5xl px-5">
        {/* Section Header: Clean, confident, unencumbered by patronizing hints */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary uppercase tracking-wider">
              <Sparkles className="h-3 w-3" /> Arsitektur Digital &amp; Ekosistem
            </div>
            <h2 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              Eksplorasi Antarmuka 3D Isometrik
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-muted-foreground max-w-xl">
              Visualisasi terurai dari runtime sistem, fondasi logika informatika, audio prosedural, dan aktivitas GitHub.
            </p>
          </div>

          {/* Mode Switcher Button (Apple-style Segmented Glass Control) */}
          <button
            type="button"
            onClick={toggleViewMode}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/80 px-4 py-2.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:bg-card hover:shadow-md active:scale-95 cursor-pointer select-none self-start sm:self-auto"
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

        {/* Unboxed 3D Perspective Stage: Open field with zero bounding box barriers */}
        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerEnter={() => setIsInteracting(true)}
          style={{ perspective: "1300px" }}
          className="relative min-h-[520px] sm:min-h-[580px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        >
          {/* Subtle 3D Architectural Ground Foundation Grid (No rigid box border) */}
          <div
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(0.95, 0.95, 0.95)`,
              transition: isInteracting ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="relative w-full max-w-2xl h-[360px] sm:h-[400px]"
          >
            {/* Ground Plane Grid (Subtle, non-boxed perspective anchor) */}
            <div
              style={{
                transform: "translateZ(0px)",
                maskImage: "radial-gradient(circle at center, black 45%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 45%, transparent 75%)",
              }}
              className="absolute inset-x-[-10%] inset-y-[-10%] rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 via-honey/5 to-transparent pointer-events-none transition-opacity duration-500"
            >
              {/* Perspective grid lines */}
              <div
                className="w-full h-full opacity-35"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(194,94,48,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(194,94,48,0.2) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* LAYER 1: Core Runtime & Nitro Engine (Z: 25px in 3D Mode) */}
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
                transform: isExploded
                  ? `translate3d(10px, 15px, ${activeCard === 1 ? 65 : 30}px)`
                  : "translate3d(10px, 15px, 0px)",
                boxShadow: isExploded
                  ? activeCard === 1
                    ? "0 30px 60px -15px rgba(0,0,0,0.35), 0 0 25px rgba(194,94,48,0.25)"
                    : "0 20px 40px -12px rgba(0,0,0,0.22), 0 0 15px rgba(194,94,48,0.12)"
                  : "0 4px 12px rgba(0,0,0,0.06)",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease",
              }}
              className={`absolute top-4 left-2 sm:left-6 w-64 sm:w-72 rounded-2xl border p-4 backdrop-blur-xl cursor-pointer select-none ${
                activeCard === 1
                  ? "border-primary bg-card/95 ring-2 ring-primary/40"
                  : "border-border/80 bg-card/85 hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-foreground">Runtime Engine</h4>
                  <p className="font-mono text-[10px] text-muted-foreground">Nitro + TanStack Start</p>
                </div>
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-primary">
                  Node v26
                </span>
              </div>
              <div className="mt-3 rounded-lg bg-muted/60 p-2.5 font-mono text-[11px] leading-relaxed text-muted-foreground">
                <p className="text-caramel font-semibold">&gt; dev.portfolio()</p>
                <p className="text-foreground/90">✓ Cloudflare module</p>
                <p className="text-emerald-600 dark:text-emerald-400">✓ 100% tests passing</p>
              </div>
            </div>

            {/* LAYER 2: Gunadarma Informatics Hub (Z: 60px in 3D Mode) */}
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
                transform: isExploded
                  ? `translate3d(180px, 45px, ${activeCard === 2 ? 100 : 65}px)`
                  : "translate3d(180px, 45px, 0px)",
                boxShadow: isExploded
                  ? activeCard === 2
                    ? "0 35px 70px -15px rgba(0,0,0,0.38), 0 0 30px rgba(224,159,62,0.3)"
                    : "0 25px 45px -12px rgba(0,0,0,0.25), 0 0 20px rgba(224,159,62,0.15)"
                  : "0 4px 12px rgba(0,0,0,0.06)",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease",
              }}
              className={`absolute top-2 right-2 sm:right-6 w-68 sm:w-76 rounded-2xl border p-4 backdrop-blur-xl cursor-pointer select-none ${
                activeCard === 2
                  ? "border-honey bg-card/95 ring-2 ring-honey/40"
                  : "border-border/80 bg-card/85 hover:border-honey/60"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-honey/15 text-honey">
                  <GraduationCap className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-foreground">Universitas Gunadarma</h4>
                  <p className="font-mono text-[10px] text-muted-foreground">Informatika &apos;25</p>
                </div>
                <span className="ml-auto rounded-full bg-honey/15 px-2 py-0.5 text-[9px] font-bold text-honey">
                  Active
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="rounded-md border border-border bg-background/80 px-2 py-0.5 text-foreground">
                  Python
                </span>
                <span className="rounded-md border border-border bg-background/80 px-2 py-0.5 text-foreground">
                  TypeScript
                </span>
                <span className="rounded-md border border-border bg-background/80 px-2 py-0.5 text-foreground">
                  Algorithms
                </span>
              </div>
            </div>

            {/* LAYER 3: Live GitHub Pulse (Z: 95px in 3D Mode) */}
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
                transform: isExploded
                  ? `translate3d(40px, 175px, ${activeCard === 3 ? 135 : 95}px)`
                  : "translate3d(40px, 175px, 0px)",
                boxShadow: isExploded
                  ? activeCard === 3
                    ? "0 35px 75px -15px rgba(0,0,0,0.4), 0 0 30px rgba(194,94,48,0.3)"
                    : "0 25px 50px -12px rgba(0,0,0,0.26), 0 0 20px rgba(194,94,48,0.18)"
                  : "0 4px 12px rgba(0,0,0,0.06)",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease",
              }}
              className={`absolute bottom-8 left-4 sm:left-10 w-64 sm:w-72 rounded-2xl border p-4 backdrop-blur-xl cursor-pointer select-none ${
                activeCard === 3
                  ? "border-primary bg-card/95 ring-2 ring-primary/40"
                  : "border-border/80 bg-card/85 hover:border-primary/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-foreground">GitHub Pulse</h4>
                    <p className="font-mono text-[10px] text-muted-foreground">@deryhafizh</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2 font-mono text-xs">
                <span className="text-muted-foreground">Continuous Learning</span>
                <span className="font-bold text-primary">Public Code</span>
              </div>
            </div>

            {/* LAYER 4: Procedural Web Audio Synth (Z: 125px in 3D Mode) */}
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
                transform: isExploded
                  ? `translate3d(210px, 195px, ${activeCard === 4 ? 165 : 125}px)`
                  : "translate3d(210px, 195px, 0px)",
                boxShadow: isExploded
                  ? activeCard === 4
                    ? "0 40px 80px -15px rgba(0,0,0,0.42), 0 0 35px rgba(224,159,62,0.35)"
                    : "0 28px 55px -12px rgba(0,0,0,0.28), 0 0 22px rgba(224,159,62,0.2)"
                  : "0 4px 12px rgba(0,0,0,0.06)",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease",
              }}
              className={`absolute bottom-6 right-2 sm:right-8 w-68 sm:w-76 rounded-2xl border p-4 backdrop-blur-xl cursor-pointer select-none ${
                activeCard === 4
                  ? "border-honey bg-card/95 ring-2 ring-honey/40"
                  : "border-border/80 bg-card/85 hover:border-honey/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-honey/15 text-honey">
                  <Volume2 className="h-4 w-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-foreground">Web Audio Synthesizer</h4>
                  <p className="font-mono text-[10px] text-muted-foreground">Procedural FX · 0 KB Asset</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 h-4">
                <span className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
                <span className="w-1.5 h-4 bg-latte rounded-full animate-pulse delay-75" />
                <span className="w-1.5 h-2 bg-honey rounded-full animate-pulse delay-150" />
                <span className="w-1.5 h-3.5 bg-primary rounded-full animate-pulse" />
                <span className="w-1.5 h-2 bg-latte rounded-full animate-pulse delay-100" />
                <span className="ml-2 font-mono text-[10px] text-muted-foreground">Harmonic Sine Waves</span>
              </div>
            </div>

            {/* LAYER 5: Coffee Culture & Identity Chip (Z: 155px in 3D Mode) */}
            <div
              onMouseEnter={() => {
                playHover();
                setActiveCard(5);
              }}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => {
                playClick();
                setActiveCard(5);
              }}
              style={{
                transform: isExploded
                  ? `translate3d(120px, 305px, ${activeCard === 5 ? 190 : 155}px)`
                  : "translate3d(120px, 305px, 0px)",
                boxShadow: isExploded
                  ? activeCard === 5
                    ? "0 30px 60px -10px rgba(0,0,0,0.4), 0 0 25px rgba(194,94,48,0.3)"
                    : "0 20px 40px -10px rgba(0,0,0,0.25), 0 0 15px rgba(194,94,48,0.15)"
                  : "0 4px 10px rgba(0,0,0,0.06)",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease",
              }}
              className={`absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border px-4 py-2 backdrop-blur-xl cursor-pointer select-none flex items-center gap-2 ${
                activeCard === 5
                  ? "border-primary bg-card/95 ring-2 ring-primary/40 text-primary"
                  : "border-border/80 bg-card/85 text-foreground hover:border-primary/60"
              }`}
            >
              <Coffee className="h-3.5 w-3.5 text-caramel" />
              <span className="font-mono text-xs font-semibold">
                DERY.H · &ldquo;Ngopi dulu, ngoding kemudian&rdquo;
              </span>
              <Cpu className="h-3 w-3 text-honey ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
