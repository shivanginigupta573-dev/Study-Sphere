import React from "react";
import { Routes, Route } from "react-router-dom";
import Planner from "./pages/Planner";
import Dashboard from "./pages/Dashboard";
import Timer from "./pages/Timer";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans">
      <div className="max-w-6xl mx-auto p-6 sm:p-8 flex flex-col md:flex-row gap-8">
        <Sidebar />
        <main className="flex-1">
          <div className="glass rounded-3xl p-6 md:p-10 min-h-[85vh]">
            <Routes>
              <Route path="/" element={<Planner />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
