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
    <div>
      <h1 className="text-2xl font-semibold mb-4">Study Planner</h1>
      <ScheduleForm addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} markDone={markDone} />
    </div>
  );
}
