import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Dashboard from "./pages/Dashboard";
import Timer from "./pages/Timer";
import Today from "./pages/Today";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#F9FAF8] dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans">
      <div className="max-w-[1400px] mx-auto p-6 sm:p-8 flex flex-col md:flex-row gap-8">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-[90vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/today" element={<Today />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <Footer />
        </main>
     
      </div>
      <Footer/>
    </div>
  );
}

export default App;
