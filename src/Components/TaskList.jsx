import React from "react";

export default function TaskList({ tasks, removeTask, markDone }) {
  return (
    <div className="mt-4 space-y-3">
      {tasks.length === 0 && <div className="text-sm text-gray-500">No tasks yet</div>}
      {tasks.map((t, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded bg-white/40 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <div className="font-medium">{t.subject}</div>
            <div className="text-xs text-gray-500">{t.minutes} mins • {t.date}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>markDone(i)} className="px-2 py-1 bg-green-500 text-white rounded text-sm">Done</button>
            <button onClick={()=>removeTask(i)} className="px-2 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
