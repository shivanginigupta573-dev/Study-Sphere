import { useState } from "react";
import HeatmapView from "./components/HeatmapView";

export default function Analytics() {
  const [heatmapValues, setHeatmapValues] = useState([
    { date: "2024-12-10", count: 1 },
    { date: "2024-12-11", count: 3 },
    { date: "2024-12-12", count: 2 },
  ]);

  return (
    <div className="p-6">
      <HeatmapView values={heatmapValues} />
    </div>
  );
}
