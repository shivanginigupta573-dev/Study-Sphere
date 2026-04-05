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
    <div>
      <h1 className="text-2xl font-semibold mb-4">Analytics Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <HeatmapView values={heat} />
        </div>

        <div>
          <DonutChart data={dist} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <LineChart data={weekly} />
        <ProgressBar title="Goal Progress" value={totalMinutes} max={60*10 /* e.g. 10 hours */} />
      </div>
    </div>
  );
}
