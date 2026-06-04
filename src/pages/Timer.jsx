import React from "react";
import TimerWidget from "../Components/TimerWidget";
import { toast } from "sonner";

export default function Timer() {
  function onComplete(minutes, subject) {
    const logs = JSON.parse(localStorage.getItem("task_logs") || "[]");

    logs.push({
      subject,
      minutes,
      date: new Date().toISOString().slice(0, 10),
    });

    localStorage.setItem("task_logs", JSON.stringify(logs));

    toast.success(`Session logged: ${minutes} mins for ${subject}`);
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-indigo-400 tracking-tight">
          Focus Timer
        </h1>
      </header>

      <TimerWidget onComplete={onComplete} />
    </div>
  );
}