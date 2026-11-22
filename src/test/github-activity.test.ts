import { describe, expect, it } from "vitest";
import { groupEvents, pickFeatured, type GhEvent, type Repo } from "@/services/github";

const ev = (id: string, type: string, repo: string, created_at: string, payload = {}): GhEvent => ({ id, type, repo: { name: repo }, created_at, payload });

describe("GitHub activity feed", () => {
  it("merges same-day pushes to one repo into a single line with a count", () => {
    const items = groupEvents([
      ev("1", "PushEvent", "a/x", "2026-11-10T11:40:00Z"),
      ev("2", "PushEvent", "a/x", "2026-11-10T11:45:00Z"),
      ev("3", "PushEvent", "a/x", "2026-11-10T11:42:00Z"),
    ]);
    expect(items).toHaveLength(1);
    expect(items[0]?.text).toBe("Push 3 kali ke a/x");
    expect(items[0]?.date).toBe("2026-11-10T11:45:00Z");
  });

  it("keeps pushes on different days as separate lines, newest first", () => {
    const items = groupEvents([
      ev("1", "PushEvent", "a/x", "2026-11-05T10:00:00Z"),
      ev("2", "PushEvent", "a/x", "2026-11-10T10:00:00Z"),
    ]);
    expect(items.map((i) => i.id)).toEqual(["2", "1"]);
  });

  it("describes being added as a collaborator", () => {
    expect(groupEvents([ev("1", "MemberEvent", "team/app", "2026-11-09T01:57:45Z", { action: "added" })])[0]?.text)
      .toBe("Bergabung sebagai kolaborator di team/app");
  });
});

describe("pickFeatured", () => {
  const repo = (name: string, extra: Partial<Repo> = {}): Repo => ({
    id: name.length, name, description: null, language: null, html_url: "", homepage: null,
    stargazers_count: 0, fork: false, size: 10, updated_at: "", pushed_at: "2026-01-01T00:00:00Z", ...extra,
  });
  it("skips forks, empty repos, profile README repo, and porto portfolio repo", () => {
    const out = pickFeatured([
      repo("deryhafizh"),
      repo("forked", { fork: true }),
      repo("empty", { size: 0 }),
      repo("Porto"),
      repo("porto"),
      repo("real"),
    ], "deryhafizh");
    expect(out.map((r) => r.name)).toEqual(["real"]);
  });
});
