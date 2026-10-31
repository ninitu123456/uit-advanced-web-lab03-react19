
import { useEffect, useId, useState } from "react";
import { PUBG_VN_SQUADS } from "../data/pubgTelemetry.js";
import { fetchKraftonTelemetry } from "../services/pubgTelemetry.js";

const REQUEST_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export function PubgMatchTelemetry({ squadId = "te" }) {
  const selectorId = useId();

  const [selectedSquad, setSelectedSquad] = useState(squadId);
  const [retryTick, setRetryTick] = useState(0);

  const [view, setView] = useState({
    status: REQUEST_STATUS.IDLE,
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    // Start a new request for the selected squad.
    // Defer the state update to avoid a synchronous
    // setState-in-effect lint warning.
    queueMicrotask(() => {
      if (!controller.signal.aborted) {
        setView({
          status: REQUEST_STATUS.LOADING,
          data: null,
          error: null,
        });
      }
    });

    fetchKraftonTelemetry(selectedSquad, {
      signal: controller.signal,
    })
      .then((payload) => {
        if (controller.signal.aborted) return;

        setView({
          status: REQUEST_STATUS.SUCCESS,
          data: payload,
          error: null,
        });
      })
      .catch((error) => {
        // Aborted requests are not network failures.
        if (
          controller.signal.aborted ||
          error.name === "AbortError"
        ) {
          return;
        }

        setView({
          status: REQUEST_STATUS.ERROR,
          data: null,
          error: error.message,
        });
      });

    // Cleanup runs before the next effect
    // and when the component unmounts.
    return () => {
      controller.abort();
    };
  }, [selectedSquad, retryTick]);

  function handleSquadChange(event) {
    const nextSquad = event.target.value;

    setSelectedSquad(nextSquad);

    // Immediately hide telemetry from the old squad.
    setView({
      status: REQUEST_STATUS.LOADING,
      data: null,
      error: null,
    });
  }

  function handleRetry() {
    setView({
      status: REQUEST_STATUS.LOADING,
      data: null,
      error: null,
    });

    setRetryTick((previous) => previous + 1);
  }

  return (
    <section aria-label="PUBG Live Telemetry">
      <header>
        <h2>KRAFTON PVS Live Telemetry</h2>
        <p>
          Monitor Vietnamese PUBG squads through a
          simulated satellite connection.
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
      </div>

      {view.status === REQUEST_STATUS.IDLE && (
        <p>Waiting for satellite connection...</p>
      )}

      {view.status === REQUEST_STATUS.LOADING && (
        <section
          aria-busy="true"
          aria-label="Loading PUBG telemetry"
        >
          <p>Syncing KRAFTON Radar...</p>
        </section>
      )}

      {view.status === REQUEST_STATUS.SUCCESS &&
        view.data && (
          <article aria-live="polite">
            <h3>{view.data.name}</h3>

            <dl>
              <dt>Map</dt>
              <dd>{view.data.map}</dd>

              <dt>Phase</dt>
              <dd>{view.data.phase}</dd>

              <dt>Players Alive</dt>
              <dd>{view.data.alive}</dd>

              <dt>Kills</dt>
              <dd>{view.data.kills}</dd>

              <dt>WWCD Probability</dt>
              <dd>{view.data.wwcdProb}</dd>

              <dt>Status</dt>
              <dd>{view.data.status}</dd>
            </dl>
          </article>
        )}

      {view.status === REQUEST_STATUS.ERROR && (
        <section role="alert">
          <h3>Blue-Zone Link Lost</h3>
          <p>{view.error}</p>

          <button
            type="button"
            onClick={handleRetry}
          >
            Reconnect Satellite (Retry)
          </button>
        </section>
      )}
    </section>
  );
}
