import React from "react";

export default function TaskList({ tasks, removeTask, markDone }) {
  return (
    <div className="mt-6 space-y-4">
      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 glass rounded-2xl text-gray-400 dark:text-gray-500">
          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          <span className="font-medium text-lg">No sessions planned yet</span>
          <span className="text-sm mt-1">Add a subject above to get started!</span>
        </div>
      )}
      {tasks.map((t, i) => (
        <div key={i} className="group flex items-center justify-between p-4 px-6 rounded-2xl glass transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border-l-4 border-l-indigo-500">
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t.subject}</h4>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
              <span className="flex items-center gap-1 bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>{t.minutes} mins</span>
              <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>{t.date}</span>
            </div>
          </div>
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={()=>markDone(i)} className="px-4 py-2 font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl text-sm transition-colors decoration-0 border border-emerald-500/20 shadow-sm">Done</button>
            <button onClick={()=>removeTask(i)} className="px-4 py-2 font-semibold bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white rounded-xl text-sm transition-colors border border-red-500/20 shadow-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
