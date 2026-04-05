import React from "react";
import TimerWidget from "../Components/TimerWidget";

export default function Timer() {
  function onComplete(minutes, subject) {
    // log to storage
    const logs = JSON.parse(localStorage.getItem("task_logs") || "[]");
    logs.push({ subject, minutes, date: new Date().toISOString().slice(0,10) });
    localStorage.setItem("task_logs", JSON.stringify(logs));
    alert(`Session logged: ${minutes} mins for ${subject}`);
  }

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow-sm">
        Focus Timer
      </h1>
      <TimerWidget onComplete={onComplete} />
    </div>
  );
}
