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
    <div className="animate-in fade-in zoom-in duration-500">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow-sm">
        Analytics Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">Activity Heatmap</h3>
          <HeatmapView values={heat} />
        </div>

        <div className="glass p-6 rounded-3xl flex flex-col justify-center items-center">
          <h3 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300 self-start">Subject Distribution</h3>
          <div className="w-full max-w-[200px]"><DonutChart data={dist} /></div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">Weekly Hours</h3>
          <LineChart data={weekly} />
        </div>
        
        <div className="glass p-6 rounded-3xl flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-6 text-gray-700 dark:text-gray-300">Goal Progress</h3>
          <ProgressBar title="Total Time Logged" value={totalMinutes} max={60*10} />
        </div>
      </div>
    </div>
  );
}
