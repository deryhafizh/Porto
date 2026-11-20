import { Github } from "lucide-react";
import { heroIntro, profile } from "@/data/portfolio";
import type { useGitHub } from "@/hooks/use-github";
import { useSound } from "@/hooks/use-sound";
import { useTypewriter } from "@/hooks/use-typewriter";
import { btnGhost, btnPrimary, delay } from "./ui";

export function Hero({ gh }: { gh: ReturnType<typeof useGitHub> }) {
  const { playHover, playClick } = useSound();
  const typedRole = useTypewriter([
    "Informatics Student Gunadarma '25",
    "Aspiring Software Developer",
    "Building Ideas Into Code",
    "Ngopi dulu, ngoding kemudian ☕",
  ]);

  // The headline appears word by word, rising out of a soft blur (one time, on load).
  const words = ["Halo,", "aku", ...profile.name.split(" ")];
  const lastStep = words.length * 90;
  const after = (ms: number) => delay(1, lastStep + ms);

  return (
    <section id="home" className="lavender relative overflow-hidden border-b border-border/60 pb-16 pt-20 md:pb-24 md:pt-28">
      <div className="dot-pattern absolute inset-0 pointer-events-none" aria-hidden />
      <div className="hero-parallax mx-auto max-w-3xl px-5 text-center">
        <p className="enter font-display text-base italic text-caramel tracking-wide">{profile.motto}</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          {words.map((w, i) => (
            <span key={i} className={`enter inline-block ${i >= 2 ? "gradient-text" : ""}`} style={delay(i + 1, 90)}>
              {w}{i < words.length - 1 ? "\u00a0" : ""}
            </span>
          ))}
        </h1>

        {/* Dynamic typewriter text (like ibnu-portfolio) */}
        <div className="enter mt-4 flex items-center justify-center gap-1.5 font-mono text-sm font-semibold text-primary sm:text-base" style={after(0)}>
          <span>&gt;</span>
          <span>{typedRole}</span>
          <span className="typed-cursor" aria-hidden>|</span>
        </div>

        <p className="enter mt-2 text-base font-medium text-foreground/80" style={after(60)}>{profile.title}</p>
        <p className="enter mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground" style={after(120)}>
          {profile.tagline} {heroIntro}
        </p>

        {/* Live stats from GitHub in Tailgrids counter style */}
        <div className="enter mt-7 flex min-h-6 flex-wrap justify-center items-center gap-2.5" style={after(240)}>
          <span
            onMouseEnter={playHover}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs font-semibold shadow-xs backdrop-blur-xs transition-colors duration-150 hover:border-primary/40 cursor-default select-none"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted-foreground">Status:</span>
            <span className="text-foreground">Learning &amp; Building</span>
          </span>
          {gh.user && (
            <span
              onMouseEnter={playHover}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs font-semibold shadow-xs backdrop-blur-xs transition-colors duration-150 hover:border-primary/40 cursor-default select-none"
            >
              <span className="text-muted-foreground">Repositori:</span>
              <span className="font-mono text-primary font-bold">{gh.user.public_repos}</span>
            </span>
          )}
          {gh.user && (
            <span
              onMouseEnter={playHover}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs font-semibold shadow-xs backdrop-blur-xs transition-colors duration-150 hover:border-primary/40 cursor-default select-none"
            >
              <span className="text-muted-foreground">Followers:</span>
              <span className="font-mono text-primary font-bold">{gh.user.followers}</span>
            </span>
          )}
        </div>

        <div className="enter mt-9 flex flex-wrap justify-center gap-3" style={after(360)}>
          <a
            href="#projects"
            onMouseEnter={playHover}
            onClick={playClick}
            className={btnPrimary}
          >
            Lihat Proyekku
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className={btnGhost}
          >
            <Github className="h-4 w-4" /> Kunjungi GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
