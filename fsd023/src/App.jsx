// src/App.jsx
import React from "react";
import { TaskProvider } from "./context/TaskContext.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

const MainApp = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? "bg-gray-900 " : "bg-gray-100 text-gray-900"} min-h-screen transition-all duration-300`}>
      {/* Header */}
      <header className="py-8 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-600 dark:text-white">
            Taskify
          </h1>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="max-w-full m-3  pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* To Do Column */}
          <div className="bg-red-200 rounded-2xl p-4 min-h-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">To Do</h2>
              <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <TaskForm columnType="todo" />
            <TaskList columnType="todo" />
          </div>

          {/* In Progress Column */}
          <div className="bg-yellow-200 rounded-2xl p-4 min-h-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">In Progress</h2>
              <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <TaskForm columnType="inprogress" />
            <TaskList columnType="inprogress" />
          </div>

          {/* Under Review Column */}
          <div className="bg-blue-200 rounded-2xl p-4 min-h-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Under Review</h2>
              <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <TaskForm columnType="review" />
            <TaskList columnType="review" />
          </div>

          {/* Finished Column */}
          <div className="bg-green-200 rounded-2xl p-4 min-h-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Finished</h2>
              <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <TaskForm columnType="finished" />
            <TaskList columnType="finished" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <MainApp />
      </TaskProvider>
    </ThemeProvider>
  );
}