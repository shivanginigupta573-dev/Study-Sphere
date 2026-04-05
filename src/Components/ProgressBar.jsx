import React from "react";

export default function ProgressBar({ title, value, max }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="p-3 rounded bg-white/40 dark:bg-gray-800/60 border">
      <div className="flex justify-between mb-2">
        <div>{title}</div>
        <div className="text-sm text-gray-500">{pct}%</div>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded">
        <div style={{ width: `${pct}%` }} className="h-3 bg-emerald-500 rounded"></div>
      </div>
    </div>
  );
}
