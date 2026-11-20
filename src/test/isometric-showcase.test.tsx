import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { IsometricShowcase } from "@/components/portfolio/IsometricShowcase";

describe("IsometricShowcase", () => {
  it("renders the 3D showcase with heading and mode switcher", () => {
    render(<IsometricShowcase />);
    expect(screen.getByText("Eksplorasi Antarmuka 3D Isometrik")).toBeDefined();
    expect(screen.getByText("Mode: 3D Exploded View")).toBeDefined();
  });

  it("toggles between 3D Exploded View and 2D Flat Layout", () => {
    render(<IsometricShowcase />);
    const toggleBtn = screen.getByRole("button", { name: /Mode: 3D Exploded View/i });
    fireEvent.click(toggleBtn);
    expect(screen.getByText("Mode: 2D Flat Layout")).toBeDefined();
  });
});
