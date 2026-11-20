import { AlertTriangle, ExternalLink, GitCommitHorizontal, Github, Loader2 } from "lucide-react";
import { extraProjects, profile, projectDemos, projectNotes } from "@/data/portfolio";
import { useGitHub } from "@/hooks/use-github";
import { useSound } from "@/hooks/use-sound";
import { groupEvents, pickFeatured, timeAgo } from "@/services/github";
import { Section, btnPrimary, delay } from "./ui";

type GH = ReturnType<typeof useGitHub>;

function Loading({ what }: { what: string }) {
  return <p className="flex items-center gap-3 py-8 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Mengambil {what} dari GitHub…</p>;
}
function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-5 shadow-sm">
      <p className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4 text-destructive" /> {msg}</p>
      <a href={profile.githubProfile} target="_blank" rel="noopener noreferrer" className="text-sm text-caramel underline underline-offset-4">Lihat langsung di GitHub</a>
    </div>
  );
}
const fullDate = (iso: string) => new Date(iso).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" });

type ProjectView = { key: string; name: string; language: string | null; description: string; repoUrl?: string | undefined; demoUrl?: string | undefined; updated?: string | undefined };

function ProjectCard({ p, i }: { p: ProjectView; i: number }) {
  const { playHover, playClick } = useSound();
  return (
    <article
      data-reveal
      style={delay(i)}
      onMouseEnter={playHover}
      className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-[border-color,box-shadow] duration-200 ease-out hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {p.name}
          </h3>
          {p.language && (
            <span className="shrink-0 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-xs font-medium text-caramel transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              {p.language}
            </span>
          )}
        </div>
        
        {p.updated && (
          <p className="mt-1 text-xs text-muted-foreground">
            Diperbarui <time dateTime={p.updated} title={fullDate(p.updated)}>{timeAgo(p.updated)}</time>
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
          {p.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border/60 pt-4">
        {p.demoUrl && (
          <a
            href={p.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-colors duration-150 hover:bg-latte hover:shadow-sm active:scale-[0.97] cursor-pointer select-none"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Coba demo
          </a>
        )}
        {p.repoUrl && (
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-colors duration-150 hover:border-primary/50 hover:bg-accent hover:text-primary active:scale-[0.97] cursor-pointer select-none"
          >
            <Github className="h-3.5 w-3.5" /> Repositori
          </a>
        )}
      </div>
    </article>
  );
}

export function Projects({ gh }: { gh: GH }) {
  const fromGitHub: ProjectView[] = pickFeatured(gh.repos, profile.githubUser).map((r) => ({
    key: String(r.id), name: r.name, language: r.language,
    description: r.description ?? projectNotes[r.name] ?? "Deskripsi belum ditulis.",
    repoUrl: r.html_url, demoUrl: r.homepage || projectDemos[r.name], updated: r.pushed_at,
  }));
  const extras: ProjectView[] = extraProjects.map((p) => ({ key: p.name, ...p }));
  const all = [...extras, ...fromGitHub];
  return (
    <Section id="projects" title="Proyek di Rumahku" eyebrow="Koleksi Portofolio" note="Daftar repositori diambil otomatis dari GitHub, jadi selalu sesuai yang terbaru.">
      {gh.error && <div className="mb-6"><ErrorBox msg={gh.error} /></div>}
      {all.length === 0 && !gh.loading ? (
        <p data-reveal className="rounded-lg border border-border bg-card p-8 text-center font-display text-lg shadow-sm">Projects are currently in progress. Stay tuned for upcoming builds.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">{all.map((p, i) => <ProjectCard key={p.key} p={p} i={i} />)}</div>
      )}
      {gh.loading && <Loading what="repositori" />}
    </Section>
  );
}

export function GitHubActivity({ gh }: { gh: GH }) {
  const items = groupEvents(gh.events);
  const lastActive = items[0]?.date;
  return (
    <Section id="github" title="Update Terbaru di GitHub" eyebrow="Aktivitas Coding" note="Aktivitas publikku yang paling baru, langsung dari GitHub.">
      {gh.loading ? <Loading what="aktivitas" /> : gh.error ? <ErrorBox msg={gh.error} /> : (
        <div className="space-y-10">
          {gh.user && (
            <div data-reveal className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <img src={gh.user.avatar_url} alt="" width={48} height={48} className="h-12 w-12 rounded-full transition-transform duration-500 hover:rotate-6 hover:scale-110" />
              <div className="mr-auto">
                <a href={gh.user.html_url} target="_blank" rel="noopener noreferrer" className="link-line font-semibold hover:text-caramel">@{gh.user.login}</a>
                {lastActive && <p className="text-sm text-muted-foreground">Terakhir aktif <time dateTime={lastActive} title={fullDate(lastActive)}>{timeAgo(lastActive)}</time></p>}
              </div>
              <dl className="flex gap-6 text-sm">
                {([["Repositori", gh.user.public_repos], ["Followers", gh.user.followers], ["Following", gh.user.following]] as const).map(([k, v]) => (
                  <div key={k}><dd className="font-display text-xl font-bold">{v}</dd><dt className="text-muted-foreground">{k}</dt></div>
                ))}
              </dl>
            </div>
          )}

          <div>
            <h3 className="mb-4 font-semibold">Linimasa</h3>
            {items.length === 0 ? (
              <p className="text-muted-foreground">Belum ada aktivitas publik dalam 90 hari terakhir. Begitu ada push baru, akan muncul di sini.</p>
            ) : (
              <ol className="relative space-y-5 border-l border-border pl-6">
                {items.map((it, i) => (
                  <li key={it.id} data-reveal style={delay(i, 60)} className="group relative">
                    <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-latte transition-all duration-300 group-hover:scale-150 group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(200,100,50,0.6)]" aria-hidden />
                    <a href={it.url} target="_blank" rel="noopener noreferrer" className="link-line font-medium hover:text-primary">{it.text}</a>
                    <p className="text-sm text-muted-foreground"><time dateTime={it.date} title={fullDate(it.date)}>{timeAgo(it.date)}</time></p>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {gh.commits.length > 0 && gh.commitsRepo && (
            <div data-reveal>
              <h3 className="mb-4 font-semibold">Commit terakhir di <a href={`https://github.com/${gh.commitsRepo}`} target="_blank" rel="noopener noreferrer" className="text-caramel transition-colors hover:text-primary hover:underline">{gh.commitsRepo}</a></h3>
              <ul className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                {gh.commits.map((c) => (
                  <li key={c.sha}>
                    <a href={c.html_url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 hover:bg-accent/80 active:scale-[0.99]">
                      <GitCommitHorizontal className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:scale-125 group-hover:text-primary" />
                      <span className="min-w-0 flex-1 truncate transition-colors group-hover:text-foreground">{c.commit.message.split("\n")[0]}</span>
                      <code className="font-mono text-xs text-caramel transition-colors group-hover:text-primary">{c.sha.slice(0, 7)}</code>
                      <time className="hidden shrink-0 text-xs text-muted-foreground sm:inline" dateTime={c.commit.author.date}>{timeAgo(c.commit.author.date)}</time>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Same streak card (and colors) as on the README. Hides itself if the service is down. */}
          <figure data-reveal className="flex justify-center overflow-hidden py-2">
            <img src={`https://streak-stats.demolab.com?user=${profile.githubUser}&background=f7f5ff&ring=f4a261&fire=e76f51&currStreakNum=2d2420&currStreakLabel=a2591f&sideNums=2d2420&sideLabels=a2591f&dates=6f5c4b&stroke=e2dcf5&border=e2dcf5`}
              alt="Statistik streak kontribusi GitHub" width={495} height={195} loading="lazy" className="mx-auto max-w-full rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              onError={(e) => { const f = e.currentTarget.closest("figure"); if (f) f.style.display = "none"; }} />
          </figure>
        </div>
      )}
      <div className="mt-10 text-center">
        <a href={profile.githubProfile} target="_blank" rel="noopener noreferrer" className={btnPrimary}><Github className="h-4 w-4" /> Explore My GitHub</a>
      </div>
    </Section>
  );
}
