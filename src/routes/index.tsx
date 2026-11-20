import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { IsometricShowcase } from "@/components/portfolio/IsometricShowcase";
import { About, Footer, Journey, MariTerhubung, Skills } from "@/components/portfolio/Sections";
import { GitHubActivity, Projects } from "@/components/portfolio/GitHubSections";
import { useGitHub } from "@/hooks/use-github";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";
import { profile } from "@/data/portfolio";

const title = "Dery Hafizh Latief | Developer Portfolio";
const description =
  "Portfolio Dery Hafizh Latief, mahasiswa Informatika Universitas Gunadarma 2025: proyek, tech stack yang sedang dipelajari, dan update terbaru dari GitHub.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const gh = useGitHub(profile.githubUser); // fetched once, shared by two sections
  useLenis(); // buttery smooth momentum scrolling
  useReveal(); // scroll-in animations for text and cards
  return (
    <>
      <Navbar />
      <main>
        <Hero gh={gh} />
        <IsometricShowcase />
        <About />
        <Skills />
        <Projects gh={gh} />
        <GitHubActivity gh={gh} />
        <Journey />
        <MariTerhubung />
      </main>
      <Footer />
    </>
  );
}
