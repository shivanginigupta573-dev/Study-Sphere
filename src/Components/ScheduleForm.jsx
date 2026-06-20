import React, { useState } from "react";

export default function ScheduleForm({ addTask }) {
  const [subject, setSubject] = useState("");
  const [minutes, setMinutes] = useState(25);
  const [date] = useState(() => new Date().toISOString().slice(0,10));

  function submit(e) {
    e.preventDefault();
    if (!subject) return alert("add subject");
    addTask({ subject, minutes: Number(minutes), date });
    setSubject("");
    setMinutes(25);
  }

  return (
    <form onSubmit={submit} className="bg-white dark:bg-[#111827] p-6 rounded-2xl mb-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300">
      <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-200">What do you want to study today?</h3>
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <input 
          value={subject} 
          onChange={(e)=>setSubject(e.target.value)} 
          placeholder="e.g. DSA, DBMS, Machine Learning..." 
          className="flex-1 w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 text-sm transition-all" 
        />
        
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 w-full sm:w-auto">
          <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <select 
            value={minutes} 
            onChange={(e)=>setMinutes(e.target.value)}
            className="p-1.5 bg-transparent focus:outline-none font-semibold text-gray-700 dark:text-gray-300 text-sm cursor-pointer"
          >
            <option value={15}>15 min</option>
            <option value={25}>25 min</option>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>60 min</option>
            <option value={90}>90 min</option>
          </select>
        </div>
        
        <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-teal-800 text-white font-semibold rounded-xl hover:bg-teal-900 transition-colors duration-300 text-sm shadow-sm">
          Add to Today
        </button>
      </div>
    </form>
  );
}
