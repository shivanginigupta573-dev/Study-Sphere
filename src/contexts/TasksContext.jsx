import React, { createContext, useContext } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { toast } from "sonner";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("planner_tasks", []);
  
  // task_logs is used heavily across the app for analytics
  const [logs, setLogs] = useLocalStorage("task_logs", []);

  function addTask(task) {
    setTasks((prev) => [...prev, task]);
  }

  function removeTask(idx) {
    setTasks((prev) => {
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  }

  function markDone(idx) {
    const t = tasks[idx];
    logSession(t.subject, t.minutes, t.date);
    removeTask(idx);
    toast.success("Session logged for analytics!");
  }

  function logSession(subject, minutes, date = new Date().toISOString().slice(0, 10)) {
    setLogs((prev) => [
      ...prev,
      { subject, minutes, date }
    ]);
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask, markDone, logs, logSession }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
