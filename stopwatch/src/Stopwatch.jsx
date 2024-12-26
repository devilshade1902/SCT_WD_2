import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]); 
  const timerRef = useRef(null);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); 
      }, 10);
    }
  };

  const pauseStopwatch = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body text-center">
          <h1 className="mb-4">Stopwatch</h1>
          <div
            className="display-4 fw-bold p-3 rounded bg-light border d-inline-block"
            style={{ width: "200px" }}
          >
            {formatTime(time)}
          </div>
          <div className="mt-4 d-flex justify-content-center gap-3">
            <button
              className="btn btn-success"
              onClick={startStopwatch}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              className="btn btn-warning"
              onClick={pauseStopwatch}
              disabled={!isRunning}
            >
              Pause
            </button>
            <button className="btn btn-danger" onClick={resetStopwatch}>
              Reset
            </button>
            <button
              className="btn btn-primary"
              onClick={recordLap}
              disabled={!isRunning}
            >
              Lap
            </button>
          </div>
        </div>
      </div>

      <div className="card mt-4 shadow">
        <div className="card-body">
          <h2 className="mb-3">Laps</h2>
          {laps.length > 0 ? (
            <ul className="list-group">
              {laps.map((lap, index) => (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={index}
                >
                  <span>Lap {index + 1}</span>
                  <span>{formatTime(lap)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No laps recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
