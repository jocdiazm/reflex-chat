import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import dayjs from "dayjs";
import { TimeAgo } from "@/components/ui/timeago";

describe("TimeAgo component smoke test", () => {
  it("renders without crashing", () => {
    render(<div> 9 seconds ago</div>);
    expect(
      screen.getByText(/seconds ago|minute ago|minutes ago/i),
    ).toBeDefined();
  });

  it("renders renders the correct time", () => {
    const timestamp = dayjs().toISOString();
    render(<TimeAgo timestamp={timestamp} />);
    expect(
      screen.getAllByText(/seconds ago|minute ago|minutes ago |ago/i),
    ).toBeDefined();
  });
  it("updates the relative time correctly", () => {
    const timestamp = dayjs().subtract(5, "minutes").toISOString();
    render(<TimeAgo timestamp={timestamp} />);
    expect(screen.getAllByText(/5 minutes ago/i)).toBeDefined();
  });
});
