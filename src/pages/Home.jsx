import React from "react";
import { Link } from "react-router-dom";
import ScheduleForm from "../Components/ScheduleForm";
import TaskList from "../Components/TaskList";
import HeatmapView from "../Components/HeatmapView";
import useProfile from "../utils/useProfile";
import { useTasks } from "../contexts/TasksContext";
import { heatmapValues, thisWeekStats } from "../utils/calcStats";
import { toast } from "sonner";

export default function Home() {
  const { profile } = useProfile();
  const { tasks, addTask, removeTask, markDone, logs } = useTasks();
  
  const heat = heatmapValues(logs);
  const stats = thisWeekStats(logs);

  // format total minutes to hours and mins
    const formatTime = (mins) => {
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  // --- NEW: Calculate dynamic greeting based on local time ---
  const currentHour = new Date().getHours();
  let greeting = "Good evening,"; // Default (5:00 PM - 4:59 AM)
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning,";   // 5:00 AM - 11:59 AM
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon,"; // 12:00 PM - 4:59 PM
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      {/* Hero Header */}
      <header className="mb-8 bg-white dark:bg-[#111827] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col md:flex-row relative">
        <div className="p-8 md:p-10 flex-1 z-10 flex flex-col justify-center">
          <h2 className="text-2xl text-gray-800 dark:text-gray-200 font-medium">{greeting}</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2 flex items-center gap-2 tracking-tight">
            {profile.name || "User"} <span className="text-yellow-400 animate-pulse">✨</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3 font-medium text-lg">Let's make today a productive one.</p>
        </div>
        
        {/* Hero Image */}
        <div className="md:w-1/2 relative h-48 md:h-auto">
           <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 dark:from-[#111827] dark:via-[#111827]/80 to-transparent z-10"></div>
           <img 
             src="/study_desk_hero.png" 
             alt="Aesthetic study desk" 
             className="absolute inset-0 w-full h-full object-cover object-center"
           />
        </div>
      </header>

      {/* Main Schedule Form */}
      <ScheduleForm addTask={addTask} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Today's Plan */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-gray-800 dark:text-gray-200">Today's Plan</h3>
              <span className="bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 text-xs px-2.5 py-1 rounded-full font-semibold">
                {tasks.length} sessions
              </span>
            </div>
            <button className="text-primary-600 dark:text-primary-400 text-sm font-semibold hover:underline">View all</button>
          </div>
          <TaskList tasks={tasks} removeTask={removeTask} markDone={markDone} />
        </div>

        {/* Focus Session Link */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center transition-colors duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 dark:opacity-20 transition-transform duration-700 group-hover:scale-105">
             <img src="/study_desk_hero.png" alt="Focus background" className="w-full h-full object-cover blur-sm" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-md rounded-2xl mb-6 flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-lg">
               <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h4 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2">Ready to focus?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-[200px]">Eliminate distractions and get deep work done.</p>
            <Link to="/timer" className="w-full py-3.5 bg-primary-800 hover:bg-primary-900 text-white font-semibold rounded-xl transition-colors shadow-lg block">
              Start Focus Session
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consistency (Heatmap) */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6">Consistency</h3>
          <div className="overflow-x-auto pb-2">
            <HeatmapView values={heat} />
          </div>
          <div className="flex justify-between items-center mt-4 text-xs font-semibold text-gray-500">
             <span><strong className="text-gray-800 dark:text-gray-200">5/7</strong> days studied this week</span>
             <div className="flex items-center gap-1">
               Less 
               <div className="w-3 h-3 rounded bg-gray-100 dark:bg-gray-800 ml-1"></div>
               <div className="w-3 h-3 rounded bg-primary-200 dark:bg-primary-900"></div>
               <div className="w-3 h-3 rounded bg-primary-400 dark:bg-primary-700"></div>
               <div className="w-3 h-3 rounded bg-primary-600 dark:bg-primary-500"></div>
               <div className="w-3 h-3 rounded bg-primary-800 dark:bg-primary-300"></div>
               <span className="ml-1">More</span>
             </div>
          </div>
        </div>

        {/* This Week Stats */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">This Week</h3>
            <button className="text-primary-600 dark:text-primary-400 text-sm font-semibold hover:underline">View insights</button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Total Study Time */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Total Study Time</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{formatTime(stats.totalMinutes)}</p>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-1">↑ 12% from last week</p>
              </div>
            </div>
            
            {/* Longest Session */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-900/40 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Longest Session</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.longestSession} min</p>
                <p className="text-xs text-gray-400 font-medium mt-1">Record</p>
              </div>
            </div>

            {/* Most Studied */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Most Studied</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.mostStudied}</p>
                <p className="text-xs text-gray-400 font-medium mt-1">Focus subject</p>
              </div>
            </div>

            {/* Completed sessions */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/40 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Completed</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.completedSessions} sessions</p>
                <p className="text-xs text-gray-400 font-medium mt-1">Keep going!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="mt-8 bg-[#F5F7F5] dark:bg-primary-900/10 p-5 rounded-2xl flex items-center justify-between border border-primary-100/50 dark:border-primary-900/30 text-primary-800 dark:text-primary-200">
        <div className="flex items-center gap-3">
           <svg className="w-6 h-6 opacity-60" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.714 2.023-9.609 9.983-9.609v3.667c-3.136 0-4.609 1.139-4.882 3.333h4.882v10h-10zm-14.017 0v-7.391c0-5.714 2.023-9.609 9.983-9.609v3.667c-3.136 0-4.609 1.139-4.882 3.333h4.882v10h-10z"/></svg>
           <p className="font-medium">Discipline today, freedom tomorrow.</p>
        </div>
        <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
      </div>
    </div>
  );
}
