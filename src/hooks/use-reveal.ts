import { useEffect } from "react";

/**
 * Scroll reveal observer inspired by https://ibnu-portfolio.netlify.app/
 * Targets all elements with class '.r' or attribute '[data-reveal]'.
 * When entering viewport, adds class 'in' and 'is-visible'.
 * When leaving viewport, removes them so that text and elements gracefully
 * glide in on both scroll down and scroll up.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.add("in");
            el.classList.add("is-visible");
          } else {
            const rect = e.boundingClientRect;
            // Only un-reveal if element is meaningfully outside the viewport
            if (rect.top > window.innerHeight + 80 || rect.bottom < -80) {
              if (window.scrollY < 100 && rect.top < window.innerHeight) {
                el.classList.add("in");
                el.classList.add("is-visible");
              } else {
                el.classList.remove("in");
                el.classList.remove("is-visible");
              }
            }
          }
        }
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      }
    );

    const scan = () => {
      document.querySelectorAll(".r, [data-reveal], [data-reveal-words]").forEach((el) => {
        io.observe(el);
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
