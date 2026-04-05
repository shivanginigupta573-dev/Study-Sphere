import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import useProfile from "../utils/useProfile";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const { profile, setProfile } = useProfile();
  const { name, college, avatar } = profile;

  return (
    <aside className="w-64 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur border border-gray-200 dark:border-gray-700">

      {/* PROFILE SECTION */}
      <div className="flex items-center gap-3 mb-6">

        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            {name ? name[0] : "?"}
          </div>
        )}

        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{college}</div>
        </div>
      </div>

      {/* EDIT PROFILE BUTTON */}
      <button
        className="w-full px-3 py-2 mb-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm"
        onClick={() => document.getElementById("profileModal").showModal()}
      >
        Edit Profile
      </button>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
          }
        >
          Planner
        </NavLink>

        <NavLink
          to="/timer"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
          }
        >
          Timer
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
          }
        >
          Analytics
        </NavLink>
      </nav>

      {/* TOGGLE THEME */}
      <div className="mt-6">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm"
        >
          Toggle {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>

      {/* PROFILE EDIT MODAL */}
      <dialog
        id="profileModal"
        className="rounded-lg p-6 bg-gray-100 dark:bg-gray-800 text-black dark:text-white w-80"
      >
        <form method="dialog" className="space-y-4">

          <h3 className="text-lg font-semibold text-center">Edit Profile</h3>

          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            defaultValue={name}
            onChange={(e) =>
              setProfile((p) => ({ ...p, name: e.target.value }))
            }
            className="w-full p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />

          {/* College */}
          <input
            type="text"
            placeholder="College"
            defaultValue={college}
            onChange={(e) =>
              setProfile((p) => ({ ...p, college: e.target.value }))
            }
            className="w-full p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />

          {/* Avatar Upload */}
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
            className="w-full p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />

          <button className="w-full py-2 rounded bg-indigo-600 text-white">
            Save
          </button>

        </form>
      </dialog>
    </aside>
  );
}
