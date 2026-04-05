import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function HeatmapView({ values }) {
  return (
    <div className="p-5 rounded-2xl bg-[#0b1220] border border-slate-700 shadow-2xl">
      <h3 className="font-semibold mb-5 text-lg text-slate-100">
        Performance Heatmap
      </h3>

      <ReactCalendarHeatmap
        startDate={new Date("2024-10-01")}
        endDate={new Date("2024-12-31")}
        values={values}
        showWeekdayLabels={false}
        classForValue={(value) => {
          if (!value || value.count === 0) return "heat-0";
          if (value.count <= 2) return "heat-1";
          if (value.count <= 4) return "heat-2";
          return "heat-3";
        }}
      />

      <style>{`
        .react-calendar-heatmap text {
          fill: #94a3b8;
          font-size: 10px;
        }

        .heat-0 rect {
          fill: #020617;
        }

        .heat-1 rect {
          fill: #22c55e;
          opacity: 0.4;
        }

        .heat-2 rect {
          fill: #22c55e;
          opacity: 0.7;
        }

        .heat-3 rect {
          fill: #22c55e;
          opacity: 1;
        }

        .react-calendar-heatmap rect {
          rx: 4px;
          ry: 4px;
          transition: all 0.2s ease;
        }

        .react-calendar-heatmap rect:hover {
          stroke: #ffffff;
          stroke-width: 1.2px;
        }
      `}</style>
    </div>
  );
}
