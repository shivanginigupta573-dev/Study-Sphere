import React, { useState } from "react";

const dotColors = [
  "bg-teal-500",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-blue-400",
  "bg-red-400"
];

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onCancel}>
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Delete session</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function TaskList({ tasks, removeTask, markDone }) {
  const [deleteIndex, setDeleteIndex] = useState(null);
  return (
    <div className="space-y-3">
      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-gray-400 dark:text-gray-500 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
          <span className="font-medium text-sm">No sessions planned yet</span>
        </div>
      )}
      {tasks.map((t, i) => (
        <div key={i} className="group flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${dotColors[i % dotColors.length]}`}></div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{t.subject}</h4>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {t.minutes} min
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={()=>markDone(i)} className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300" title="Mark Done">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </button>
              <button onClick={()=>setDeleteIndex(i)} className="text-red-500 hover:text-red-600 dark:hover:text-red-400" title="Delete">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {/* 3 dots icon for unhovered state to match design */}
            <div className="group-hover:hidden text-gray-400 px-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </div>
          </div>
        </div>
      ))}
      {tasks.length > 0 && (
        <button className="w-full py-3 mt-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Add another session
        </button>
      )}

      {deleteIndex !== null && (
        <ConfirmDeleteModal
          onConfirm={() => {
            removeTask(deleteIndex);
            setDeleteIndex(null);
          }}
          onCancel={() => setDeleteIndex(null)}
        />
      )}
    </div>
  );
}
