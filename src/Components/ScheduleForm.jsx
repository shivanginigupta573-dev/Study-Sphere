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
    <form onSubmit={submit} className="glass p-6 rounded-2xl mb-8 transform transition duration-300 hover:shadow-2xl">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Add New Session</h3>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input 
          value={subject} 
          onChange={(e)=>setSubject(e.target.value)} 
          placeholder="What do you want to study? (e.g. DSA)" 
          className="flex-1 p-3.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 font-medium transition-all" 
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e)=>setDate(e.target.value)} 
          className="p-3.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-all" 
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 p-1.5 rounded-xl border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <input 
            type="number" 
            min={5} 
            value={minutes} 
            onChange={(e)=>setMinutes(e.target.value)} 
            className="w-20 p-2 text-center bg-transparent focus:outline-none font-bold text-indigo-600 dark:text-indigo-400" 
          />
          <span className="pr-3 text-sm font-semibold text-gray-500 dark:text-gray-400">minutes</span>
        </div>
        
        <button type="submit" className="w-full sm:w-auto sm:ml-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:shadow-indigo-500/50 transition-all duration-300">
          Add Session
        </button>
      </div>
    </form>
  );
}
