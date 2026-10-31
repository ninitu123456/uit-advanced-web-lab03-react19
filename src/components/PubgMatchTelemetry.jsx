
import { useId, useRef, useState } from "react";
import { PUBG_VN_SQUADS } from "../data/pubgTelemetry.js";
import { fetchKraftonTelemetry } from "../services/pubgTelemetry.js";

const REQUEST_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export function PubgMatchTelemetry() {
  const selectorId = useId();

  const [selectedSquad, setSelectedSquad] = useState("ces");
  const [status, setStatus] = useState(REQUEST_STATUS.IDLE);
  const [telemetry, setTelemetry] = useState(null);
  const [error, setError] = useState("");

  // Prevent older requests from updating the current UI.
  const requestIdRef = useRef(0);

  async function handleConnect() {
    const requestId = ++requestIdRef.current;

    setStatus(REQUEST_STATUS.LOADING);
    setTelemetry(null);
    setError("");

    try {
      const result = await fetchKraftonTelemetry(selectedSquad);

      if (requestId !== requestIdRef.current) {
        return;
      }

      setTelemetry(result);
      setStatus(REQUEST_STATUS.SUCCESS);
    } catch (requestError) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      setError(requestError.message);
      setStatus(REQUEST_STATUS.ERROR);
    }
  }

  function handleSquadChange(event) {
    requestIdRef.current += 1;

    setSelectedSquad(event.target.value);
    setStatus(REQUEST_STATUS.IDLE);
    setTelemetry(null);
    setError("");
  }

  return (
    <section aria-label="PUBG Live Telemetry">
      <header>
        <h2>KRAFTON PVS Live Telemetry</h2>
        <p>
          Monitor Vietnamese PUBG squads through a simulated
          satellite connection.
        </p>
      </header>

      <div>
        <label htmlFor={selectorId}>
          Select PUBG Squad:
        </label>

        <select
          id={selectorId}
          value={selectedSquad}
          onChange={handleSquadChange}
        >
          {PUBG_VN_SQUADS.map((squad) => (
            <option key={squad.id} value={squad.id}>
              {squad.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleConnect}
          disabled={status === REQUEST_STATUS.LOADING}
        >
          Connect Satellite
        </button>
      </div>

      {status === REQUEST_STATUS.IDLE && (
        <p>
          Select a squad and connect to retrieve telemetry.
        </p>
      )}

      {status === REQUEST_STATUS.LOADING && (
        <section aria-label="Loading telemetry">
          <p>Connecting to satellite...</p>
        </section>
      )}

      {status === REQUEST_STATUS.SUCCESS && telemetry && (
        <article>
          <h3>{telemetry.name}</h3>

          <dl>
            <dt>Map</dt>
            <dd>{telemetry.map}</dd>

            <dt>Phase</dt>
            <dd>{telemetry.phase}</dd>

            <dt>Players Alive</dt>
            <dd>{telemetry.alive}</dd>

            <dt>Kills</dt>
            <dd>{telemetry.kills}</dd>

            <dt>WWCD Probability</dt>
            <dd>{telemetry.wwcdProb}</dd>

            <dt>Status</dt>
            <dd>{telemetry.status}</dd>
          </dl>
        </article>
      )}

      {status === REQUEST_STATUS.ERROR && (
        <section role="alert">
          <h3>Satellite Connection Failed</h3>
          <p>{error}</p>

          <button type="button" onClick={handleConnect}>
            Reconnect Satellite
          </button>
        </section>
      )}
    </section>
  );
}
