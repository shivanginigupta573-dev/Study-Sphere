import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import useProfile from "../utils/useProfile";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const { profile, setProfile } = useProfile();
  const { name, college, avatar } = profile;

  return (
    <aside className="w-64 p-5 rounded-3xl glass flex flex-col transition-all duration-300">

      {/* PROFILE SECTION */}
      <div className="flex items-center gap-4 mb-8">

        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-400 dark:border-indigo-500 shadow-md transform hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md transform hover:scale-105 transition duration-300">
            {name ? name[0] : "?"}
          </div>
        )}

        <div>
          <div className="font-bold text-gray-900 dark:text-gray-100">{name || "User"}</div>
          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{college || "Add College"}</div>
        </div>
      </div>

      {/* EDIT PROFILE BUTTON */}
      <button
        className="w-full px-4 py-2.5 mb-6 rounded-xl bg-indigo-50/50 dark:bg-gray-800/80 text-indigo-700 dark:text-indigo-300 font-semibold text-sm hover:shadow-md hover:bg-indigo-100 dark:hover:bg-gray-700 transition duration-300 border border-indigo-100 dark:border-gray-700"
        onClick={() => document.getElementById("profileModal").showModal()}
      >
        Edit Profile
      </button>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2">
        {[
          { path: "/", label: "Planner" },
          { path: "/timer", label: "Timer" },
          { path: "/dashboard", label: "Analytics" },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 transform scale-[1.02]"
                  : "text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800/80 hover:text-indigo-600 dark:hover:text-indigo-300"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* TOGGLE THEME */}
      <div className="mt-auto pt-6">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full px-4 py-3 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 flex justify-center items-center gap-2 border border-transparent dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm"
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* PROFILE EDIT MODAL */}
      <dialog
        id="profileModal"
        className="rounded-3xl p-8 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/50 shadow-2xl text-gray-900 dark:text-gray-100 max-w-sm w-full m-auto backdrop:bg-gray-900/40 backdrop:backdrop-blur-sm"
      >
        <form method="dialog" className="space-y-5">

          <h3 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Edit Profile</h3>

          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              defaultValue={name}
              onChange={(e) =>
                setProfile((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* College */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">College</label>
            <input
              type="text"
              placeholder="College"
              defaultValue={college}
              onChange={(e) =>
                setProfile((p) => ({ ...p, college: e.target.value }))
              }
              className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Avatar Upload */}
          <div className="space-y-1">
             <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">Avatar Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  setProfile((p) => ({ ...p, avatar: reader.result }));
                };
                reader.readAsDataURL(file);
              }}
              className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/50 dark:file:text-indigo-300"
            />
          </div>

          <button className="w-full py-3 mt-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-500/30 transform hover:-translate-y-0.5 transition duration-300">
            Save Changes
          </button>

        </form>
      </dialog>
    </aside>
  );
}
