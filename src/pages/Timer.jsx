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
    <div>
      <h1 className="text-2xl font-semibold mb-4">Focus Timer</h1>
      <TimerWidget onComplete={onComplete} />
    </div>
  );
}
