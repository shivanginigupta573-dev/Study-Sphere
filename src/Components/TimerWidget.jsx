import React, { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - onComplete(sessionMinutes, subject)
 * - defaultMinutes
 */
export default function TimerWidget({ onComplete, defaultMinutes = 25, defaultSubject = "General" }) {
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
      onComplete(defaultMinutes, subject);
      setSeconds(defaultMinutes * 60);
    }
  }, [seconds]);

  function format(s) {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  return (
    <div className="p-4 rounded-lg bg-white/40 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
      <div className="text-3xl font-mono text-center">{format(seconds)}</div>
      <div className="flex gap-2 mt-3">
        <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="flex-1 p-2 rounded border">
          <option>General</option>
          <option>DSA</option>
          <option>Math</option>
          <option>ML</option>
        </select>
        <button onClick={()=>setRunning(!running)} className="px-3 py-2 bg-indigo-600 text-white rounded">{running? 'Pause' : 'Start'}</button>
        <button onClick={()=>{ setRunning(false); setSeconds(defaultMinutes*60); }} className="px-3 py-2 bg-gray-400 rounded">Reset</button>
      </div>
    </div>
  );
}
