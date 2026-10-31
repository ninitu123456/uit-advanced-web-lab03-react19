
import test from "node:test";
import { setImmediate, clearImmediate } from "node:timers";
import assert from "node:assert/strict";

import {
  fetchKraftonTelemetry,
  TELEMETRY_CONFIG,
} from "../src/services/pubgTelemetry.js";

import { PUBG_VN_SQUADS } from "../src/data/pubgTelemetry.js";

// Use a zero-duration timer for deterministic tests.
// The real service configuration is not modified.
function installFastTimer(t) {
  t.mock.method(globalThis, "setTimeout", (callback) => {
    return setImmediate(callback);
  });

  t.mock.method(globalThis, "clearTimeout", (handle) => {
    clearImmediate(handle);
  });
}

test("01 - returns Genius Esports telemetry", async (t) => {
  installFastTimer(t);

  const result = await fetchKraftonTelemetry("ge");

  assert.equal(result.id, "ge");
  assert.equal(result.name, "Genius Esports");
  assert.equal(result.map, "Taego");
  assert.equal(result.kills, 9);
  assert.equal(result.wwcdProb, "41%");
});

test("02 - returns Cerberus telemetry without packet loss", async (t) => {
  installFastTimer(t);
  t.mock.method(Math, "random", () => 0.99);

  const result = await fetchKraftonTelemetry("ces");

  assert.equal(result.id, "ces");
  assert.equal(result.map, "Erangel");
  assert.equal(result.kills, 14);
  assert.equal(result.alive, 4);
});

test("03 - rejects unknown squad IDs", async (t) => {
  installFastTimer(t);

  await assert.rejects(
    fetchKraftonTelemetry("unknown"),
    /Unknown PUBG squad/
  );
});

test("04 - Erangel packet loss rejects the request", async (t) => {
  installFastTimer(t);
  t.mock.method(Math, "random", () => 0.1);

  await assert.rejects(
    fetchKraftonTelemetry("ces"),
    /Satellite packet loss detected on Erangel/
  );
});

test("05 - Miramar packet loss rejects the request", async (t) => {
  installFastTimer(t);
  t.mock.method(Math, "random", () => 0.1);

  await assert.rejects(
    fetchKraftonTelemetry("te"),
    /Satellite packet loss detected on Miramar/
  );
});

test("06 - Taego succeeds regardless of random value", async (t) => {
  installFastTimer(t);
  t.mock.method(Math, "random", () => 0);

  const result = await fetchKraftonTelemetry("ge");

  assert.equal(result.name, "Genius Esports");
  assert.equal(result.status, "Rotating Blue Zone");
});

test("07 - AbortController cancels a pending request", async () => {
  const controller = new AbortController();

  const request = fetchKraftonTelemetry("ces", {
    signal: controller.signal,
  });

  controller.abort();

  await assert.rejects(request, {
    name: "AbortError",
  });
});

test("08 - already-aborted signal rejects immediately", async () => {
  const controller = new AbortController();
  controller.abort();

  await assert.rejects(
    fetchKraftonTelemetry("te", {
      signal: controller.signal,
    }),
    { name: "AbortError" }
  );
});

test("09 - configuration and dataset are valid", () => {
  assert.equal(TELEMETRY_CONFIG.packetLossRate, 0.35);
  assert.equal(TELEMETRY_CONFIG.latencyMs, 1800);

  assert.deepEqual(
    TELEMETRY_CONFIG.affectedMaps,
    ["Erangel", "Miramar"]
  );

  assert.equal(PUBG_VN_SQUADS.length, 3);
  assert.equal(
    new Set(PUBG_VN_SQUADS.map((squad) => squad.id)).size,
    3
  );
});

test("10 - service returns a copy of the source data", async (t) => {
  installFastTimer(t);

  const result = await fetchKraftonTelemetry("ge");
  const original = PUBG_VN_SQUADS.find(
    (squad) => squad.id === "ge"
  );

  assert.notStrictEqual(result, original);
  assert.deepEqual(result, original);
});
