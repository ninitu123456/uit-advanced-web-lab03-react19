
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PubgMatchTelemetry } from "../src/components/PubgMatchTelemetry.jsx";
import { fetchKraftonTelemetry } from "../src/services/pubgTelemetry.js";

vi.mock("../src/services/pubgTelemetry.js", () => ({
  fetchKraftonTelemetry: vi.fn(),
}));

const squads = {
  ces: {
    id: "ces",
    name: "Cerberus Esports",
    map: "Erangel",
    phase: "Phase 6",
    alive: 4,
    kills: 14,
    wwcdProb: "68%",
    status: "In Safe Zone",
  },
  te: {
    id: "te",
    name: "The Expendables",
    map: "Miramar",
    phase: "Phase 7",
    alive: 4,
    kills: 18,
    wwcdProb: "82%",
    status: "Holding High Ground",
  },
  ge: {
    id: "ge",
    name: "Genius Esports",
    map: "Taego",
    phase: "Phase 5",
    alive: 3,
    kills: 9,
    wwcdProb: "41%",
    status: "Rotating Blue Zone",
  },
};

function deferred() {
  let resolve;
  let reject;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

describe("PubgMatchTelemetry", () => {
  it("01 - renders an accessible squad selector", () => {
    fetchKraftonTelemetry.mockReturnValue(new Promise(() => {}));

    render(<PubgMatchTelemetry />);

    const selector = screen.getByRole("combobox", {
      name: /select pubg squad/i,
    });

    expect(selector).toBeTruthy();
    expect(selector.value).toBe("te");
    expect(selector.options).toHaveLength(3);
  });

  it("02 - shows loading skeleton", async () => {
    fetchKraftonTelemetry.mockReturnValue(new Promise(() => {}));

    render(<PubgMatchTelemetry />);

    const loading = await screen.findByRole("status");

    expect(loading.getAttribute("aria-busy")).toBe("true");
    expect(
      screen.getByText("Syncing KRAFTON Radar...")
    ).toBeTruthy();
  });

  it("03 - displays telemetry after success", async () => {
    fetchKraftonTelemetry.mockResolvedValue(squads.ge);

    render(<PubgMatchTelemetry squadId="ge" />);

    expect(
      await screen.findByRole("heading", {
        name: "Genius Esports",
      })
    ).toBeTruthy();

    expect(screen.getByText("Taego · Phase 5")).toBeTruthy();
    expect(screen.getByText("41%")).toBeTruthy();
  });

  it("04 - displays accessible error alert", async () => {
    fetchKraftonTelemetry.mockRejectedValue(
      new Error("Satellite packet loss detected on Miramar.")
    );

    render(<PubgMatchTelemetry />);

    const alert = await screen.findByRole("alert");

    expect(alert.textContent).toContain("Blue-Zone Link Lost");
    expect(alert.textContent).toContain("Miramar");

    expect(
      screen.getByRole("button", {
        name: /reconnect satellite/i,
      })
    ).toBeTruthy();
  });

  it("05 - retries after a failed request", async () => {
    fetchKraftonTelemetry
      .mockRejectedValueOnce(new Error("Packet lost"))
      .mockResolvedValueOnce(squads.te);

    render(<PubgMatchTelemetry />);

    const retry = await screen.findByRole("button", {
      name: /reconnect satellite/i,
    });

    fireEvent.click(retry);

    expect(
      await screen.findByRole("heading", {
        name: "The Expendables",
      })
    ).toBeTruthy();

    expect(fetchKraftonTelemetry).toHaveBeenCalledTimes(2);
  });

  it("06 - ignores stale responses after rapid squad changes", async () => {
    const cesRequest = deferred();
    const teRequest = deferred();
    const geRequest = deferred();

    fetchKraftonTelemetry.mockImplementation((id) => {
      if (id === "ces") return cesRequest.promise;
      if (id === "te") return teRequest.promise;
      return geRequest.promise;
    });

    render(<PubgMatchTelemetry squadId="ces" />);

    const selector = screen.getByRole("combobox");

    fireEvent.change(selector, {
      target: { value: "te" },
    });

    fireEvent.change(selector, {
      target: { value: "ge" },
    });

    geRequest.resolve(squads.ge);

    expect(
      await screen.findByRole("heading", {
        name: "Genius Esports",
      })
    ).toBeTruthy();

    cesRequest.resolve(squads.ces);
    teRequest.resolve(squads.te);

    expect(
      screen.queryByRole("heading", {
        name: "Cerberus Esports",
      })
    ).toBeNull();

    expect(
      screen.queryByRole("heading", {
        name: "The Expendables",
      })
    ).toBeNull();
  });

  it("07 - aborts the request on unmount", () => {
    fetchKraftonTelemetry.mockReturnValue(new Promise(() => {}));

    const { unmount } = render(<PubgMatchTelemetry />);

    const signal = fetchKraftonTelemetry.mock.calls[0][1].signal;

    expect(signal.aborted).toBe(false);

    unmount();

    expect(signal.aborted).toBe(true);
  });
});
