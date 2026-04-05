import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";

export default function HeatmapView({ values }) {
  const endDate = new Date();
  const startDate = subDays(endDate, 90);

  return (
    <div className="w-full">
      <ReactCalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        showWeekdayLabels={false}
        classForValue={(value) => {
          if (!value || value.count === 0) return "heat-0";
          if (value.count <= 1) return "heat-1";
          if (value.count <= 2) return "heat-2";
          if (value.count <= 3) return "heat-3";
          return "heat-4";
        }}
      />

      <style>{`
        .react-calendar-heatmap text {
          fill: #6b7280;
          font-size: 10px;
        }

        .react-calendar-heatmap rect {
          rx: 3px;
          ry: 3px;
        }

        /* Light Mode – GitHub/LeetCode green scale */
        rect.heat-0 { fill: #ebedf0 !important; }
        rect.heat-1 { fill: #9be9a8 !important; }
        rect.heat-2 { fill: #40c463 !important; }
        rect.heat-3 { fill: #30a14e !important; }
        rect.heat-4 { fill: #216e39 !important; }

        /* Dark Mode – GitHub dark green scale */
        html.dark .react-calendar-heatmap text { fill: #9ca3af; }
        html.dark rect.heat-0 { fill: #161b22 !important; }
        html.dark rect.heat-1 { fill: #0e4429 !important; }
        html.dark rect.heat-2 { fill: #006d32 !important; }
        html.dark rect.heat-3 { fill: #26a641 !important; }
        html.dark rect.heat-4 { fill: #39d353 !important; }

        .react-calendar-heatmap rect:hover {
          stroke: #818cf8;
          stroke-width: 1px;
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
