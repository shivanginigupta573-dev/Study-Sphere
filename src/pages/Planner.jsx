import React from "react";
import ScheduleForm from "../Components/ScheduleForm";
import TaskList from "../Components/TaskList";
import useLocalStorage from "../utils/useLocalStorage";

export default function Planner() {
  const [tasks, setTasks] = useLocalStorage("planner_tasks", []);
  // tasks: {subject, minutes, date}

  function addTask(task) {
    setTasks([...tasks, task]);
  }
  function removeTask(idx) {
    const copy = tasks.slice();
    copy.splice(idx, 1);
    setTasks(copy);
  }
  function markDone(idx) {
    // when marked done, push to log for analytics
    const t = tasks[idx];
    const logs = JSON.parse(localStorage.getItem("task_logs") || "[]");
    logs.push({ subject: t.subject, minutes: t.minutes, date: t.date });
    localStorage.setItem("task_logs", JSON.stringify(logs));
    removeTask(idx);
    alert("Logged for analytics!");
  }

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow-sm">
        Study Planner
      </h1>
      <ScheduleForm addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} markDone={markDone} />
    </div>
  );
}
