import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function LineChart({ data }) {
  // data: [{date:'yyyy-mm-dd', hours: x}, ...]
  const labels = data.map(d => d.date.slice(5)); // mm-dd
  const dataset = {
    labels,
    datasets: [
      {
        label: "Hours",
        data: data.map(d => d.hours),
        fill: false,
        borderColor: "#06b6d4",
        tension: 0.3
      }
    ]
  };
  return <div className="p-4 rounded bg-white/40 dark:bg-gray-800/60 border"><Line data={dataset} /></div>;
}
