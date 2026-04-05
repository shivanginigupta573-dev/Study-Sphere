import React, { useState } from "react";

export default function ScheduleForm({ addTask }) {
  const [subject, setSubject] = useState("");
  const [minutes, setMinutes] = useState(25);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));

  function submit(e) {
    e.preventDefault();
    if (!subject) return alert("add subject");
    addTask({ subject, minutes: Number(minutes), date });
    setSubject("");
    setMinutes(25);
  }

  return (
    <form onSubmit={submit} className="bg-white/40 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex gap-2 mb-2">
        <input value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Subject (e.g. DSA)" className="flex-1 p-2 rounded border" />
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="p-2 rounded border" />
      </div>
      <div className="flex gap-2 items-center">
        <input type="number" min={5} value={minutes} onChange={(e)=>setMinutes(e.target.value)} className="w-24 p-2 rounded border" />
        <span>minutes</span>
        <button type="submit" className="ml-auto px-3 py-2 bg-indigo-600 text-white rounded">Add</button>
      </div>
    </form>
  );
}
