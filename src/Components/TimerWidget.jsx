import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, ChevronDown } from "lucide-react";

/**
 * Props:
 * - onComplete(sessionMinutes, subject)
 * - defaultMinutes
 */
export default function TimerWidget({
  onComplete,
  defaultMinutes = 25,
  defaultSubject = "General",
  presets = [25, 50, 90]
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
      audio.play().catch(() => {});

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
    <div className="flex flex-col items-center p-12 lg:p-24 bg-white dark:bg-[#111827] rounded-3xl mt-2 relative border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-500">
      
      {/* Subject Selector */}
      <div className="mb-8 w-full flex justify-center group relative">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="appearance-none text-xl font-bold bg-transparent text-center focus:outline-none border-b-2 border-transparent hover:border-primary-200 dark:hover:border-primary-800 pb-1 text-primary-600 dark:text-primary-400 cursor-pointer pr-6 tracking-wide transition-colors"
        >
          <option>General</option>
          <option>DSA</option>
          <option>Math</option>
          <option>ML</option>
        </select>
        <ChevronDown className="w-5 h-5 text-primary-400 absolute right-[calc(50%-3rem)] top-1 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Session Presets */}
      <div className="flex gap-3 mb-12 flex-wrap justify-center">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setRunning(false);
              setMinutes(preset);
              setSeconds(preset * 60);
            }}
            className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-semibold tracking-wide ${
              minutes === preset
                ? "bg-primary-600 text-white shadow-md shadow-primary-500/20"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {preset} min
          </button>
        ))}
      </div>

      {/* Timer Text */}
      <div className="text-[7rem] md:text-[11rem] font-bold tracking-tighter tabular-nums leading-none mb-14 text-gray-800 dark:text-gray-100 transition-colors duration-500">
        {format(seconds)}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setRunning(!running)}
          className={`w-40 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            running
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-500 dark:hover:bg-yellow-900/50"
              : "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20"
          }`}
        >
          {running ? (
            <><Pause className="w-5 h-5" /> Pause</>
          ) : (
            <><Play className="w-5 h-5" fill="currentColor" /> Start</>
          )}
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setSeconds(minutes * 60);
          }}
          className="w-40 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl text-lg transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" /> Reset
        </button>
      </div>
    </div>
  );
}