
import { PUBG_VN_SQUADS } from "../data/pubgTelemetry.js";

// Simulated satellite network configuration
export const TELEMETRY_CONFIG = {
  latencyMs: 1800,
  packetLossRate: 0.35,
  affectedMaps: ["Erangel", "Miramar"],
};

/**
 * Simulates fetching live KRAFTON PUBG telemetry.
 *
 * @param {string} squadId - Selected squad ID.
 * @param {{ signal?: AbortSignal }} options
 * @returns {Promise<object>}
 */
export function fetchKraftonTelemetry(
  squadId,
  { signal } = {}
) {
  return new Promise((resolve, reject) => {
    // Reject immediately if the request was already aborted.
    if (signal?.aborted) {
      reject(
        new DOMException(
          "Telemetry request aborted",
          "AbortError"
        )
      );
      return;
    }

    let settled = false;

    function cleanup() {
      signal?.removeEventListener("abort", handleAbort);
    }

    function handleAbort() {
      if (settled) return;

      settled = true;
      clearTimeout(timeoutId);
      cleanup();

      reject(
        new DOMException(
          "Telemetry request aborted",
          "AbortError"
        )
      );
    }

    const timeoutId = setTimeout(() => {
      if (settled) return;

      settled = true;
      cleanup();

      const squad = PUBG_VN_SQUADS.find(
        (item) => item.id === squadId
      );

      if (!squad) {
        reject(
          new Error(`Unknown PUBG squad: ${squadId}`)
        );
        return;
      }

      const isAffectedMap =
        TELEMETRY_CONFIG.affectedMaps.includes(
          squad.map
        );

      const packetLost =
        isAffectedMap &&
        Math.random() < TELEMETRY_CONFIG.packetLossRate;

      if (packetLost) {
        reject(
          new Error(
            `Satellite packet loss detected on ${squad.map}.`
          )
        );
        return;
      }

      // Return a new object instead of exposing source data.
      resolve({ ...squad });
    }, TELEMETRY_CONFIG.latencyMs);

    signal?.addEventListener("abort", handleAbort, {
      once: true,
    });

    // Handle an abort occurring while registering the listener.
    if (signal?.aborted) {
      handleAbort();
    }
  });
}
