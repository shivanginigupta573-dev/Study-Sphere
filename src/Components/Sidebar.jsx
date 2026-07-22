import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import useProfile from "../utils/useProfile";
import { Home, Calendar, Timer, BarChart2, Target, Settings, ChevronRight, Moon, Sun } from "lucide-react";

export default function Sidebar({ onNavigate, modalId = "profileModal" }) {
  const { theme, setTheme } = useTheme();
  const { profile, setProfile } = useProfile();
  const { name, college, avatar } = profile;

  return (
    <aside className="w-64 flex flex-col transition-all duration-300 min-h-[90vh]">
      
      {/* LOGO SECTION */}
      <div className="flex items-center gap-3 px-4 mb-8">
        <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center text-white font-bold">
          S
        </div>
        <div>
          <h1 className="font-extrabold text-xl text-gray-900 dark:text-gray-100 tracking-tight">StudySphere</h1>
          <p className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase mt-0.5">Plan. Focus. Grow.</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-1 mb-8">
        {[
          { path: "/", label: "Home", icon: Home },
          { path: "/today", label: "Today", icon: Calendar },
          { path: "/timer", label: "Focus", icon: Timer },
          { path: "/dashboard", label: "Progress", icon: BarChart2 },
          { path: "/goals", label: "Goals", icon: Target },
          { path: "/settings", label: "Settings", icon: Settings },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 text-sm ${
                isActive
                  ? "bg-primary-50 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
              }`
            }
          >
            <item.icon className="w-5 h-5 opacity-70" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* QUOTE CARD */}
      <div className="bg-[#FDF9F1] dark:bg-yellow-900/10 p-5 rounded-2xl mb-auto border border-yellow-100 dark:border-yellow-900/30">
        <p className="text-gray-700 dark:text-gray-300 font-medium text-sm leading-relaxed" style={{fontFamily: "'Caveat', 'Comic Sans MS', cursive"}}>
          Small steps,
          <br />consistent days,
          <br />big results.
        </p>
        <div className="mt-2 w-10 border-b-2 border-gray-400"></div>
      </div>

      {/* BOTTOM PROFILE & THEME SECTION */}
      <div className="mt-8 space-y-4">
        {/* Profile Card */}
        <div 
          onClick={() => document.getElementById(modalId).showModal()}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
        >
          <div className="flex items-center gap-3">
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-white font-bold text-sm">
                {name ? name[0] : "?"}
              </div>
            )}
            <div className="overflow-hidden">
              <div className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">{name || "User"}</div>
              <div className="text-[11px] text-gray-500 truncate">{college || "Add College"}</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
            {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            Dark mode
          </div>
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-11 h-6 rounded-full transition-colors relative ${theme === "dark" ? "bg-primary-600" : "bg-gray-200"}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </div>

      {/* PROFILE EDIT MODAL */}
      <dialog id={modalId} className="rounded-3xl p-8 backdrop-blur-xl bg-white/95 dark:bg-[#111827]/95 border border-gray-200 dark:border-gray-800 shadow-2xl text-gray-900 dark:text-gray-100 max-w-sm w-full m-auto backdrop:bg-gray-900/40">
        <form method="dialog" className="space-y-5">
          <h3 className="text-xl font-bold text-center">Edit Profile</h3>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
            <input type="text" placeholder="Your Name" defaultValue={name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">College</label>
            <input type="text" placeholder="College" defaultValue={college} onChange={(e) => setProfile((p) => ({ ...p, college: e.target.value }))} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Avatar</label>
            <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; const reader = new FileReader(); reader.onload = () => setProfile((p) => ({ ...p, avatar: reader.result })); reader.readAsDataURL(file); }} className="w-full text-sm" />
          </div>
          <button className="w-full py-3 mt-4 rounded-xl font-bold text-white bg-primary-800 hover:bg-primary-900 transition duration-300">Save Changes</button>
        </form>
      </dialog>
    </aside>
  );
}
