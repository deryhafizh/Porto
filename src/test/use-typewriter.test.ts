import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTypewriter } from "@/hooks/use-typewriter";

describe("useTypewriter", () => {
  it("initializes with empty string and types first character", async () => {
    const { result } = renderHook(() => useTypewriter(["Halo"], 10, 10, 100));
    expect(result.current).toBe("");

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 35));
    });

    expect(result.current.length).toBeGreaterThan(0);
    expect("Halo".startsWith(result.current)).toBe(true);
  });
});
