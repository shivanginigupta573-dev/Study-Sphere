import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import useProfile from "../utils/useProfile";

export default function Sidebar({ onNavigate, modalId = "profileModal" }) {
  const { theme, setTheme } = useTheme();
  const { profile, setProfile } = useProfile();
  const { name, college, avatar } = profile;

  return (
    <aside className="w-64 flex flex-col transition-all duration-300 min-h-[90vh]">
      
      {/* LOGO SECTION */}
      <div className="flex items-center gap-3 px-4 mb-8">
        <div className="w-8 h-8 rounded-full bg-teal-800 flex items-center justify-center text-white font-bold">
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
          { path: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
          { path: "/today", label: "Today", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
          { path: "/timer", label: "Focus", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
          { path: "/dashboard", label: "Progress", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
          { path: "/goals", label: "Goals", icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" },
          { path: "/settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 text-sm ${
                isActive
                  ? "bg-teal-50 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
              }`
            }
          >
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
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
              <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center text-white font-bold text-sm">
                {name ? name[0] : "?"}
              </div>
            )}
            <div className="overflow-hidden">
              <div className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">{name || "User"}</div>
              <div className="text-[11px] text-gray-500 truncate">{college || "Add College"}</div>
            </div>
          </div>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Dark mode
          </div>
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-11 h-6 rounded-full transition-colors relative ${theme === "dark" ? "bg-teal-600" : "bg-gray-200"}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </div>

      {/* PROFILE EDIT MODAL */}
      <dialog id={modalId} className="rounded-3xl p-8 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border border-gray-200 dark:border-gray-800 shadow-2xl text-gray-900 dark:text-gray-100 max-w-sm w-full m-auto backdrop:bg-gray-900/40">
        <form method="dialog" className="space-y-5">
          <h3 className="text-xl font-bold text-center">Edit Profile</h3>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
            <input type="text" placeholder="Your Name" defaultValue={name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">College</label>
            <input type="text" placeholder="College" defaultValue={college} onChange={(e) => setProfile((p) => ({ ...p, college: e.target.value }))} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Avatar</label>
            <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; const reader = new FileReader(); reader.onload = () => setProfile((p) => ({ ...p, avatar: reader.result })); reader.readAsDataURL(file); }} className="w-full text-sm" />
          </div>
          <button className="w-full py-3 mt-4 rounded-xl font-bold text-white bg-teal-800 hover:bg-teal-900 transition duration-300">Save Changes</button>
        </form>
      </dialog>
    </aside>
  );
}
