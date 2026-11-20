import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth inertia scrolling.
 * Directly referenced from Ibnu Zaky's portfolio (https://ibnu-portfolio.netlify.app/).
 * Gives buttery, momentum-based smooth scrolling on desktop and trackpads,
 * allowing scroll-driven text reveals to glide gracefully into view.
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect user's accessibility preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential decay
      anchors: { offset: -70 },
      stopInertiaOnNavigate: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);
}
