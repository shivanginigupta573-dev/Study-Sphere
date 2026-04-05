import React from "react";
import { Routes, Route } from "react-router-dom";
import Planner from "./pages/Planner";
import Dashboard from "./pages/Dashboard";
import Timer from "./pages/Timer";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-6xl mx-auto p-4 flex gap-6">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Planner />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}


export default App
