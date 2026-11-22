// Mengambil data GitHub PUBLIK. Tidak ada token, jadi tidak ada rahasia yang bocor.
// Request tanpa login dibatasi 60/jam per pengunjung, jadi hasilnya
// disimpan di sessionStorage selama 10 menit.

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  fork: boolean;
  size: number;
  updated_at: string;
  pushed_at: string;
  topics?: string[];
};

export type GitHubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
};

export type GhEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: { ref?: string | null; ref_type?: string; action?: string };
};

export type Commit = {
  sha: string;
  html_url: string;
  commit: { message: string; author: { date: string } };
};

export const GITHUB_CACHE_TTL_MS = 10 * 60 * 1000;
const API = "https://api.github.com";

async function cachedFetch<T>(url: string): Promise<T> {
  const key = `gh:${url}`;
  try {
    const hit = sessionStorage.getItem(key);
    if (hit) {
      const { t, data } = JSON.parse(hit);
      if (Date.now() - t < GITHUB_CACHE_TTL_MS) return data as T;
    }
  } catch {}
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    cache: "no-store",
  });
  if (res.status === 403 || res.status === 429) throw new Error("Batas request GitHub tercapai. Coba lagi beberapa saat lagi.");
  if (!res.ok) throw new Error(`Gagal mengambil data GitHub (${res.status}).`);
  const data = (await res.json()) as T;
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data })); } catch {}
  return data;
}

export const fetchUser = (u: string) => cachedFetch<GitHubUser>(`${API}/users/${u}`);
export const fetchRepos = (u: string) => cachedFetch<Repo[]>(`${API}/users/${u}/repos?per_page=100&sort=pushed`);
export const fetchEvents = (u: string) => cachedFetch<GhEvent[]>(`${API}/users/${u}/events/public?per_page=30`);
export const fetchCommits = (repo: string, author: string) =>
  cachedFetch<Commit[]>(`${API}/repos/${repo}/commits?per_page=5&author=${author}`);

/** Proyek = bukan fork, ada isinya, bukan repo README profil, dan bukan repo portofolio itu sendiri (Porto). Yang terbaru di-push duluan. */
export function pickFeatured(repos: Repo[], user: string) {
  const ignoredNames = new Set([
    user.toLowerCase(),
    "porto",
    "dery-builds-a-future",
    "dery-builds-a-future-main",
    "portfolio",
  ]);
  return repos
    .filter((r) => !r.fork && r.size > 0 && !ignoredNames.has(r.name.toLowerCase()))
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, 6);
}

export type ActivityItem = { id: string; text: string; repo: string; url: string; date: string; count: number };

function describe(e: GhEvent, count: number): string {
  const repo = e.repo.name;
  switch (e.type) {
    case "PushEvent":
      return count > 1 ? `Push ${count} kali ke ${repo}` : `Push ke ${repo}`;
    case "CreateEvent":
      if (e.payload.ref_type === "repository") return `Membuat repositori ${repo}`;
      return `Membuat ${e.payload.ref_type ?? "branch"} ${e.payload.ref ?? ""} di ${repo}`.replace(/\s+/g, " ");
    case "MemberEvent":
      return `Bergabung sebagai kolaborator di ${repo}`;
    case "WatchEvent":
      return `Memberi bintang ke ${repo}`;
    case "ForkEvent":
      return `Fork repositori ${repo}`;
    case "PublicEvent":
      return `Membuka ${repo} untuk publik`;
    case "PullRequestEvent":
      return `${e.payload.action === "opened" ? "Membuka" : "Memperbarui"} pull request di ${repo}`;
    case "IssuesEvent":
      return `${e.payload.action === "opened" ? "Membuka" : "Memperbarui"} issue di ${repo}`;
    default:
      return `Aktivitas di ${repo}`;
  }
}

/**
 * Mengubah daftar event GitHub jadi timeline yang ringkas:
 * diurutkan dari yang terbaru, lalu event berjenis sama di repo yang sama
 * pada hari yang sama digabung jadi satu baris ("Push 6 kali ke ...").
 */
export function groupEvents(events: GhEvent[], limit = 8): ActivityItem[] {
  const sorted = [...events].sort((a, b) => b.created_at.localeCompare(a.created_at));
  const groups: { first: GhEvent; count: number }[] = [];
  for (const e of sorted) {
    const last = groups[groups.length - 1];
    const sameDay = last && last.first.created_at.slice(0, 10) === e.created_at.slice(0, 10);
    if (last && sameDay && last.first.type === e.type && last.first.repo.name === e.repo.name) last.count++;
    else groups.push({ first: e, count: 1 });
  }
  return groups.slice(0, limit).map(({ first, count }) => ({
    id: first.id,
    text: describe(first, count),
    repo: first.repo.name,
    url: `https://github.com/${first.repo.name}`,
    date: first.created_at,
    count,
  }));
}

/** "2 hari yang lalu", "kemarin", dst. */
export function timeAgo(iso: string, now = Date.now()) {
  const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });
  const sec = Math.round((new Date(iso).getTime() - now) / 1000);
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
  for (const [unit, s] of steps) if (Math.abs(sec) >= s) return rtf.format(Math.round(sec / s), unit);
  return "baru saja";
}
