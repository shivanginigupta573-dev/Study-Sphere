import React from "react";

/**
 * Reusable empty-state card shown when a page has no content yet.
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon - Icon element rendered inside the circular badge.
 * @param {string} props.title - Short heading describing the empty state.
 * @param {string} props.description - Supporting text guiding the user on what to do next.
 */
export default function EmptyState({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-[#111827] p-12 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center transition-colors duration-500 min-h-[400px]">
      <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md">{description}</p>
    </div>
  );
}
