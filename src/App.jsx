import React, { useEffect, useState } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    }

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function handleBreakpointChange(event) {
      if (event.matches) {
        setIsSidebarOpen(false);
      }
    }

    if (mediaQuery.matches) {
      setIsSidebarOpen(false);
    }

    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F9FAF8] dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans">
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="hidden md:block">
          <Sidebar modalId="profileModalDesktop" />
        </div>

        <button
          type="button"
          aria-label={isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-sidebar"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen((open) => !open)}
          className="md:hidden fixed top-4 left-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/95 text-gray-700 shadow-lg backdrop-blur transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:border-gray-800 dark:bg-gray-900/95 dark:text-gray-100 dark:hover:bg-gray-800"
        >
          <span className="sr-only">
            {isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
          </span>
          {isSidebarOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div
          className={`md:hidden fixed inset-0 z-40 bg-gray-950/45 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden="true"
          onClick={closeSidebar}
        />

        <div
          id="mobile-sidebar"
          className={`md:hidden fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] overflow-y-auto bg-[#F9FAF8] px-4 pb-6 pt-20 shadow-2xl transition-transform duration-300 ease-out dark:bg-[#0B0F19] ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!isSidebarOpen}
          inert={!isSidebarOpen ? true : undefined}
        >
          <Sidebar onNavigate={closeSidebar} modalId="profileModalMobile" />
        </div>

        <main className="flex-1 flex flex-col min-h-[90vh] pt-14 md:pt-0">
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
