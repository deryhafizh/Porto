import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GITHUB_CACHE_TTL_MS } from "@/services/github";
import { useGitHub } from "@/hooks/use-github";

describe("useGitHub", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    sessionStorage.clear();
  });

  it("refreshes GitHub profile counts after the cache interval", async () => {
    vi.useFakeTimers();
    sessionStorage.clear();
    let profileRequests = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/users/deryhafizh")) {
        profileRequests += 1;
        return new Response(
          JSON.stringify({
            login: "deryhafizh",
            avatar_url: "",
            html_url: "https://github.com/deryhafizh",
            public_repos: profileRequests,
            followers: profileRequests,
            following: profileRequests,
            bio: null,
          }),
        );
      }
      return new Response(JSON.stringify([]));
    });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useGitHub("deryhafizh"));
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current.user?.public_repos).toBe(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(GITHUB_CACHE_TTL_MS);
    });

    expect(result.current.user?.public_repos).toBe(2);
    expect(result.current.user?.followers).toBe(2);
    expect(result.current.user?.following).toBe(2);
    expect(profileRequests).toBe(2);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/users/deryhafizh"),
      expect.objectContaining({ cache: "no-store" }),
    );
  });
});
