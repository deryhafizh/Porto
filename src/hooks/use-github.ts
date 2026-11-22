import { useEffect, useState } from "react";
import {
  fetchCommits,
  fetchEvents,
  fetchRepos,
  fetchUser,
  GITHUB_CACHE_TTL_MS,
  type Commit,
  type GhEvent,
  type GitHubUser,
  type Repo,
} from "@/services/github";

type State = {
  loading: boolean;
  error: string | null;
  user: GitHubUser | null;
  repos: Repo[];
  events: GhEvent[];
  commits: Commit[];
  commitsRepo: string | null;
};

const empty: State = {
  loading: true,
  error: null,
  user: null,
  repos: [],
  events: [],
  commits: [],
  commitsRepo: null,
};

// Memuat data GitHub saat halaman dibuka, lalu menyegarkannya sesuai TTL cache.
export function useGitHub(username: string) {
  const [state, setState] = useState<State>(empty);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const [user, repos, events] = await Promise.all([
          fetchUser(username),
          fetchRepos(username),
          fetchEvents(username).catch(() => [] as GhEvent[]), // feed boleh gagal tanpa merusak bagian lain
        ]);
        // Commit terakhir dari repo yang paling baru di-push (prioritaskan proyek selain porto/profil)
        const ignoredRepoNames = new Set(["porto", "dery-builds-a-future", "dery-builds-a-future-main", username.toLowerCase()]);
        const sortedEvents = [...events].sort((a, b) => b.created_at.localeCompare(a.created_at));
        const latestPush = sortedEvents.find((e) => {
          if (e.type !== "PushEvent") return false;
          const repoSimple = e.repo.name.split("/")[1]?.toLowerCase() ?? e.repo.name.toLowerCase();
          return !ignoredRepoNames.has(repoSimple);
        }) ?? sortedEvents.find((e) => e.type === "PushEvent");
        const commitsRepo = latestPush?.repo.name ?? null;
        const commits = commitsRepo
          ? await fetchCommits(commitsRepo, username).catch(() => [] as Commit[])
          : [];
        if (alive)
          setState({ loading: false, error: null, user, repos, events, commits, commitsRepo });
      } catch (e) {
        if (alive) {
          setState((current) => ({
            ...current,
            loading: false,
            error: e instanceof Error ? e.message : "Gagal mengambil data GitHub.",
          }));
        }
      }
    };

    void load();
    const interval = window.setInterval(() => {
      void load();
    }, GITHUB_CACHE_TTL_MS);
    return () => {
      alive = false;
      window.clearInterval(interval);
    };
  }, [username]);
  return state;
}
