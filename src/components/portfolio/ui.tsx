import type { CSSProperties, ReactNode } from "react";

/** Stagger delay for reveal animations: item i waits i × 80ms (matching Ibnu portfolio cascade). */
export const delay = (i: number, step = 80): CSSProperties =>
  ({
    "--d": `${Math.min(i, 8) * step}ms`,
    transitionDelay: `${Math.min(i, 8) * step}ms`,
  }) as CSSProperties;

/** One Tailgrids & Ibnu-style section: eyebrow badge, bold heading with subtle rule, and content with staggered entrance. */
export function Section({ id, title, eyebrow, note, children }: { id: string; title: string; eyebrow?: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      {eyebrow && (
        <div className="r mb-2.5">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="r d1 md-h2 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {note && <p className="r d2 mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{note}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** Splits text into words that rise out of a blur one after another when scrolled into view. */
export function Words({ text, step = 55 }: { text: string; step?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="w" style={{ "--d": `${i * step}ms` } as CSSProperties}>{w}{"\u00a0"}</span>
      ))}
    </>
  );
}

const tones = { primary: "bg-primary", latte: "bg-latte", honey: "bg-honey" } as const;
export type Tone = keyof typeof tones;

/** Two-part badge in the style of the shields.io badges on the GitHub README. Clean, stable hover. */
export function Badge({ label, value, tone = "primary" }: { label: string; value?: ReactNode; tone?: Tone }) {
  return (
    <span className="inline-flex overflow-hidden rounded-[6px] text-xs font-semibold leading-none shadow-xs transition-shadow duration-150 hover:shadow-sm cursor-default select-none">
      <span className="bg-badge-label px-2.5 py-1.5 text-cream transition-colors">{label}</span>
      {value !== undefined && <span className={`${tones[tone]} px-2.5 py-1.5 text-primary-foreground transition-all`}>{value}</span>}
    </span>
  );
}

export const levelTone: Record<"Beginner" | "Learning" | "Exploring", Tone> = { Beginner: "primary", Learning: "latte", Exploring: "honey" };

/** Wavy edge, borrowed from the capsule-render header on the README. */
export function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden className={`block h-16 w-full md:h-24 ${flip ? "rotate-180" : ""}`}>
      <path className="fill-primary/25" d="M0 64c160-40 320-40 480 0s320 40 480 0 320-40 480 0v56H0z" />
      <path className="fill-background" d="M0 84c180-34 360-34 540 0s360 34 540 0 270-26 360-12v48H0z" />
    </svg>
  );
}

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
// Stable, jitter-free buttons: instant smooth color transition, no boundary displacement on hover.
export const btnPrimary =
  `group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs transition-colors duration-150 ease-out hover:bg-latte hover:shadow-md hover:shadow-primary/20 active:scale-[0.98] cursor-pointer select-none [&_svg]:transition-transform [&_svg]:duration-200 group-hover:[&_svg]:scale-105 ${focus}`;
export const btnGhost =
  `group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-xs transition-colors duration-150 ease-out hover:border-primary/50 hover:bg-accent hover:text-primary hover:shadow-xs active:scale-[0.98] cursor-pointer select-none [&_svg]:transition-transform [&_svg]:duration-200 group-hover:[&_svg]:scale-105 ${focus}`;
