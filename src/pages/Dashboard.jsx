import React from "react";
import { weeklyHours, subjectDistribution, heatmapValues } from "../utils/calcStats";
import useLocalStorage from "../utils/useLocalStorage";
import HeatmapView from "../Components/HeatmapView";
import LineChart from "../Components/LineChart"
import DonutChart from "../Components/DonutChart";
import ProgressBar from "../Components/ProgressBar";

export default function Dashboard() {
  const [dummy, setDummy] = useLocalStorage("ignore", 0); // force re-render if needed
  const logs = JSON.parse(localStorage.getItem("task_logs") || "[]");

  const weekly = weeklyHours(logs);
  const dist = subjectDistribution(logs);
  const heat = heatmapValues(logs);

  const totalMinutes = logs.reduce((s, x) => s + (x.minutes || 0), 0);
  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400 tracking-tight">
          Analytics Overview
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6">Activity Heatmap</h3>
          <HeatmapView values={heat} />
        </div>

        <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col justify-center items-center transition-all duration-500">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 self-start w-full">Subject Distribution</h3>
          <div className="w-full max-w-[200px] flex-1 flex items-center justify-center">
            <DonutChart data={dist} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6">Weekly Hours</h3>
          <LineChart data={weekly} />
        </div>
        
        <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col justify-center transition-all duration-500">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6">Goal Progress</h3>
          <ProgressBar title="Total Time Logged" value={totalMinutes} max={60*10} />
        </div>
      </div>
    </div>
  );
}
