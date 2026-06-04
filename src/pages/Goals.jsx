import React from "react";

export default function Goals() {
  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400 tracking-tight">
          Your Goals
        </h1>
      </header>

      <div className="bg-white dark:bg-[#111827] p-12 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center transition-colors duration-500 min-h-[400px]">
        <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-teal-500 dark:text-teal-400 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No active goals</h2>
        <p className="text-gray-500 max-w-md">Set long-term milestones to stay motivated. Feature coming soon to help you track your bigger objectives.</p>
      </div>
    </div>
  );
}
