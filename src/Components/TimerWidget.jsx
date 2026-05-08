import React, { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - onComplete(sessionMinutes, subject)
 * - defaultMinutes
 */
export default function TimerWidget({
  onComplete,
  defaultMinutes = 25,
  defaultSubject = "General",
}) {
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [seconds, setSeconds] = useState(defaultMinutes * 60);
  const [running, setRunning] = useState(false);
  const [subject, setSubject] = useState(defaultSubject);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (seconds <= 0 && running) {
      setRunning(false);

      const audio = new Audio("/sounds/complete.mp3");
      audio.play();

      onComplete(minutes, subject);

      setSeconds(minutes * 60);
    }
  }, [seconds, running, minutes, subject, onComplete]);

  function format(s) {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");

    return `${mm}:${ss}`;
  }

  return (
    <div className="flex flex-col items-center p-8 md:p-12 glass rounded-3xl mt-6 relative overflow-hidden group transition-all duration-500">
      
      {/* Background glowing effect when running */}
      {running && (
        <div className="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-500/10 animate-pulse rounded-3xl blur-3xl -z-10"></div>
      )}

      <div className="mb-6 w-full flex justify-center">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="text-lg lg:text-xl font-bold bg-transparent text-center focus:outline-none border-b-2 border-dashed border-gray-300 dark:border-gray-600 pb-1 text-indigo-700 dark:text-indigo-400 cursor-pointer"
        >
          <option>General</option>
          <option>DSA</option>
          <option>Math</option>
          <option>ML</option>
        </select>
      </div>

      {/* Session Presets */}
      <div className="flex gap-3 mb-8 flex-wrap justify-center">
        {[25, 50, 90].map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setRunning(false);
              setMinutes(preset);
              setSeconds(preset * 60);
            }}
            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300 text-sm font-semibold"
          >
            {preset} min
          </button>
        ))}
      </div>

      <div
        className={`text-[6rem] md:text-[9rem] font-bold tracking-tighter tabular-nums leading-none mb-8 transition-colors duration-500 ${
          running
            ? "text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow-2xl scale-105"
            : "text-gray-800 dark:text-white"
        }`}
      >
        {format(seconds)}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setRunning(!running)}
          className={`w-36 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
            running
              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-indigo-500/40"
          }`}
        >
          {running ? "⏸ Pause" : "▶ Start"}
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setSeconds(minutes * 60);
          }}
          className="w-36 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl text-lg transition-all duration-300"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}