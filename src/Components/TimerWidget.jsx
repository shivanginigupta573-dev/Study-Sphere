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
    <div className="flex flex-col items-center p-12 lg:p-24 bg-[#F8F9FA] dark:bg-[#131A2A] rounded-3xl mt-2 relative border border-gray-100 dark:border-white/5 shadow-2xl transition-all duration-500">
      
      {/* Background glowing effect when running */}
      {running && (
        <div className="absolute inset-0 bg-violet-500/10 dark:bg-violet-500/20 animate-pulse rounded-3xl blur-3xl -z-10 transition-all duration-1000"></div>
      )}

      {/* Subject Selector */}
      <div className="mb-8 w-full flex justify-center group relative">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="appearance-none text-xl font-bold bg-transparent text-center focus:outline-none border-b border-dashed border-gray-300 dark:border-gray-700 pb-2 text-violet-600 dark:text-indigo-400 cursor-pointer pr-6 tracking-wide"
        >
          <option>General</option>
          <option>DSA</option>
          <option>Math</option>
          <option>ML</option>
        </select>
        <svg className="w-4 h-4 text-violet-600 dark:text-indigo-400 absolute right-[calc(50%-2.5rem)] top-1.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
      </div>

      {/* Session Presets */}
      <div className="flex gap-4 mb-12 flex-wrap justify-center">
        {[25, 50, 90].map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setRunning(false);
              setMinutes(preset);
              setSeconds(preset * 60);
            }}
            className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-bold tracking-wide shadow-sm ${
              minutes === preset
                ? "bg-gray-800 text-white dark:bg-gray-700 dark:text-white ring-2 ring-gray-400 dark:ring-gray-600 ring-offset-2 dark:ring-offset-[#131A2A]"
                : "bg-gray-200/80 dark:bg-[#1E293B] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#334155]"
            }`}
          >
            {preset} min
          </button>
        ))}
      </div>

      {/* Timer Text */}
      <div className="text-[8rem] md:text-[12rem] font-extrabold tracking-tighter tabular-nums leading-none mb-14 text-gray-900 dark:text-white transition-transform duration-500 drop-shadow-sm">
        {format(seconds)}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-5">
        <button
          onClick={() => setRunning(!running)}
          className={`w-40 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 ${
            running
              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
              : "bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white hover:opacity-95 hover:shadow-purple-500/30"
          }`}
        >
          {running ? (
            <>⏸ Pause</>
          ) : (
            <>▶ Start</>
          )}
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setSeconds(minutes * 60);
          }}
          className="w-40 py-4 bg-gray-200 dark:bg-[#1E293B] hover:bg-gray-300 dark:hover:bg-[#334155] text-gray-800 dark:text-gray-200 font-bold rounded-2xl text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm transform hover:-translate-y-0.5"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}