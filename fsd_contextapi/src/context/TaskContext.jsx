// src/context/TaskContext.js
import React, { createContext, useReducer, useEffect } from "react";

const TaskContext = createContext();

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          status: action.payload.status || "todo",
          difficulty: action.payload.difficulty || "Easy",
          deadline: action.payload.deadline || "",
          lastModified: new Date().toISOString(),
        },
      ];

    case "MOVE_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              status: action.payload.newStatus,
              lastModified: new Date().toISOString(),
            }
          : task
      );

    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              ...action.payload.updates, // merge the changes
              lastModified: new Date().toISOString(),
            }
          : task
      );

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export default TaskContext;
