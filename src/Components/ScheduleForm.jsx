import React, { useState } from "react";
import PropTypes from "prop-types";

export default function ScheduleForm({ addTask }) {
  const [subject, setSubject] = useState("");
  const [minutes, setMinutes] = useState(25);
  const [date] = useState(() => new Date().toISOString().slice(0,10));
  const [subjectError, setSubjectError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!subject.trim()) {
      setSubjectError("Please add a subject before scheduling.");
      return;
    }
    setSubjectError("");
    addTask({ subject: subject.trim(), minutes: Number(minutes), date });
    setSubject("");
    setMinutes(25);
  }

  function handleSubjectChange(e) {
    setSubject(e.target.value);
    if (subjectError) setSubjectError("");
  }

  return (
    <form onSubmit={submit} className="bg-white dark:bg-[#111827] p-6 rounded-2xl mb-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300">
      <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-200">What do you want to study today?</h3>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex-1 w-full">
          <input 
            id="schedule-subject-input"
            value={subject} 
            onChange={handleSubjectChange} 
            placeholder="e.g. DSA, DBMS, Machine Learning..." 
            aria-invalid={!!subjectError}
            aria-describedby={subjectError ? "schedule-subject-error" : undefined}
            className={`w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border focus:outline-none focus:ring-2 placeholder-gray-400 text-sm transition-all ${
              subjectError
                ? "border-red-400 dark:border-red-500 ring-2 ring-red-300 dark:ring-red-500/40 focus:ring-red-400"
                : "border-gray-200 dark:border-gray-700 focus:ring-primary-500"
            }`} 
          />
          {subjectError && (
            <p id="schedule-subject-error" className="mt-1.5 ml-1 text-xs text-red-500 dark:text-red-400 flex items-center gap-1 transition-all duration-200">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {subjectError}
            </p>
          )}
        </div>
        
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
        
        <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-primary-800 text-white font-semibold rounded-xl hover:bg-primary-900 transition-colors duration-300 text-sm shadow-sm">
          Add to Today
        </button>
      </div>
    </form>
  );
}

ScheduleForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};
