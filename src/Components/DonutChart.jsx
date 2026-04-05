import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({ data }) {
  // data: [{ subject, percent }]
  const labels = data.map(d => d.subject);
  const values = data.map(d => d.percent);
  const colors = [ "#06b6d4", "#8b5cf6", "#f97316", "#ef4444", "#10b981" ];
  const dataset = {
    labels,
    datasets: [{ data: values, backgroundColor: colors.slice(0, values.length) }]
  };
  return <div className="p-4 rounded bg-white/40 dark:bg-gray-800/60 border"><Doughnut data={dataset} /></div>;
}
