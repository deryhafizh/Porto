import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { aboutFacts, aboutText, beyondCode, profile, skills, tools } from "@/data/portfolio";
import { useSound } from "@/hooks/use-sound";
import { Badge, Section, delay } from "./ui";

const AVATAR = "https://avatars.githubusercontent.com/u/105975218?v=4";

export function About() {
  const { playHover } = useSound();
  const width = Math.max(...aboutFacts.map(([k]) => k.length)) + 1;
  return (
    <Section id="about" title="Tentang Aku" eyebrow="Profil Singkat">
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start">
        <div className="flex-1 space-y-6">
          <p data-reveal className="text-lg leading-relaxed">
            Halo! Aku <strong>{profile.name}</strong> ({profile.nickname}). {aboutText}
          </p>
          <div data-reveal style={delay(1)} onMouseEnter={playHover} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">profile.sh</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-7 text-muted-foreground">
              <code>
                {aboutFacts.map(([k, v]) => (
                  <span key={k} className="block"><span className="font-semibold text-caramel">{k.padEnd(width)}</span>: <span className="text-foreground">{v}</span></span>
                ))}
              </code>
            </pre>
          </div>
        </div>
        <div data-reveal style={delay(2)} className="shrink-0"><img src={AVATAR} alt={`Foto profil GitHub ${profile.name}`} width={170} height={170}
          onMouseEnter={playHover}
          className="h-32 w-32 rounded-full border-4 border-secondary transition-[rotate,scale,border-color,box-shadow] duration-500 ease-out hover:-rotate-3 hover:scale-105 hover:border-primary/60 hover:shadow-[0_0_24px_rgba(200,100,50,0.18)] sm:h-[170px] sm:w-[170px]" /></div>
      </div>
    </Section>
  );
}

const skillIcons: Record<string, string> = { HTML: "🌐", CSS: "🎨", JavaScript: "⚡", Python: "🐍" };

export function Skills() {
  const { playHover } = useSound();
  return (
    <Section id="skills" title="Tech Stack yang Sedang Kupelajari" eyebrow="Keahlian & Minat" note="Label menunjukkan posisiku saat ini, bukan klaim ahli.">
      <dl className="grid gap-5 sm:grid-cols-2">
        {skills.map((s, i) => (
          <div
            key={s.name}
            data-reveal
            style={delay(i)}
            onMouseEnter={playHover}
            className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-[border-color,box-shadow] duration-200 ease-out hover:border-primary/60 hover:shadow-md cursor-pointer select-none"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <span aria-hidden>{skillIcons[s.name] ?? "📦"}</span>
                </div>
                <span className="rounded-full border border-border/80 bg-muted/60 px-3 py-1 font-mono text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                  {s.level}
                </span>
              </div>
              <dt className="mt-4 font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {s.name}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
                {s.description}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <div data-reveal className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Tools & Platform:</span>
        {tools.map((t) => (
          <span key={t} onMouseEnter={playHover}>
            <Badge label={t} tone="primary" />
          </span>
        ))}
      </div>
    </Section>
  );
}

export function Journey() {
  const { playHover } = useSound();
  return (
    <Section id="journey" title="Di Luar Kode" eyebrow="Filosofi Belajar">
      <ul className="grid gap-3 sm:grid-cols-2">
        {beyondCode.map((j, i) => (
          <li
            key={j.title}
            data-reveal
            style={delay(i)}
            onMouseEnter={playHover}
            className="group rounded-xl border border-border bg-card p-4 shadow-xs transition-[border-color,box-shadow] duration-200 hover:border-primary/60 hover:shadow-md"
          >
            <div className="flex items-center gap-2 font-display text-base font-bold text-foreground transition-colors group-hover:text-primary">
              <span className="h-2 w-2 rounded-full bg-primary transition-transform duration-300 group-hover:scale-150" />
              {j.title}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">{j.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function MariTerhubung() {
  const [copied, setCopied] = useState(false);
  const { playHover, playClick, playSuccess } = useSound();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.email);
    playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const socialLinks = [
    { label: "GitHub", value: profile.githubUser, href: profile.githubProfile, Icon: Github, tone: "bg-latte" },
    { label: "LinkedIn", value: "in/deryhafizh", href: profile.linkedin, Icon: Linkedin, tone: "bg-primary" },
  ];

  return (
    <Section id="connect" title="Mari Terhubung" eyebrow="Hubungi Saya" note="Punya ide, peluang, atau proyek? Yuk ngobrol!">
      <div data-reveal className="mb-6 flex items-center gap-3.5 rounded-2xl border border-primary/25 bg-gradient-to-r from-latte/15 via-card to-honey/15 p-4 sm:p-5 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-md">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl transition-transform duration-300 hover:rotate-12 hover:scale-110 select-none">
          👋
        </span>
        <div>
          <h3 className="font-display text-base font-bold text-foreground">Terbuka untuk Diskusi &amp; Kolaborasi</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">Jangan ragu menyapa atau bertukar ide seputar programming, ide proyek, maupun obrolan santai!</p>
        </div>
      </div>

      <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <li data-reveal style={delay(0)}>
          <div className="group inline-flex w-full overflow-hidden rounded-lg text-sm font-semibold shadow-xs transition-shadow duration-150 hover:shadow-md select-none sm:w-auto">
            <a
              href={`mailto:${profile.email}`}
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-flex items-center gap-2 bg-badge-label px-4 py-3 text-cream transition-colors duration-150 hover:bg-badge-label/90 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              title="Kirim pesan lewat email"
            >
              <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" /> Email
            </a>
            <button
              onClick={handleCopyEmail}
              onMouseEnter={playHover}
              type="button"
              title="Klik untuk menyalin alamat email"
              className="flex flex-1 items-center justify-between gap-3 bg-honey px-4 py-3 text-primary-foreground transition-colors duration-150 hover:bg-honey/90 active:scale-[0.99] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className={copied ? "font-bold text-primary-foreground pop-in" : "transition-opacity group-hover:opacity-90"}>
                {copied ? "Email Tersalin! ✓" : profile.email}
              </span>
              {copied ? (
                <Check className="h-4 w-4 shrink-0 text-emerald-950 pop-in stroke-[2.5]" />
              ) : (
                <Copy className="h-3.5 w-3.5 shrink-0 opacity-60 transition-transform duration-200 group-hover:scale-110 group-hover:opacity-100" />
              )}
            </button>
          </div>
        </li>

        {socialLinks.map(({ label, value, href, Icon, tone }, i) => (
          <li key={label} data-reveal style={delay(i + 1)}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group inline-flex w-full overflow-hidden rounded-lg text-sm font-semibold shadow-xs transition-shadow duration-150 hover:shadow-md active:scale-[0.99] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
            >
              <span className="inline-flex items-center gap-2 bg-badge-label px-4 py-3 text-cream transition-colors duration-150 group-hover:bg-badge-label/90">
                <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" /> {label}
              </span>
              <span className={`flex-1 px-4 py-3 text-primary-foreground transition-colors duration-150 ${tone}`}>
                {value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export const Contact = MariTerhubung;

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/30 py-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-5 text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{profile.brand}</span>
          <span className="text-border">·</span>
          <span>{profile.title}</span>
        </div>
        <p className="font-mono">
          © {new Date().getFullYear()} {profile.name} · Gunadarma '25
        </p>
      </div>
    </footer>
  );
}
