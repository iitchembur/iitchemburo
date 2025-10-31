// src/components/TaskList.jsx
import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskList = ({ columnType, title, color }) => {
  const { tasks, dispatch } = useTasks();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  // Filter tasks by column (status)
  const filteredTasks = tasks.filter((task) => task.status === columnType);

  const handleDrop = (e) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("taskId"));

    dispatch({
      type: "MOVE_TASK",
      payload: { id, newStatus: columnType },
    });
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
  };

  const handleSave = (taskId) => {
    dispatch({
      type: "EDIT_TASK",
      payload: { id: taskId, updates: { text: editText } },
    });
    setEditingTaskId(null);
  };

  const handleDelete = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  return (
    <div
      className="task-column"
      style={{
        flex: 1,
        backgroundColor: color,
        margin: "10px",
        padding: "15px",
        borderRadius: "10px",
        minHeight: "300px",
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 style={{ textAlign: "center" }}>{title}</h2>

      {filteredTasks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>No tasks yet</p>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              cursor: "grab",
              position: "relative",
            }}
          >
            {/* --- Edit/Delete buttons on top-right --- */}
            <div style={{ position: "absolute", top: "8px", right: "8px", display: "flex", gap: "6px" }}>
              {editingTaskId === task.id ? (
                <button
                  onClick={() => handleSave(task.id)}
                  style={{ background: "green", color: "white", border: "none", borderRadius: "4px", padding: "2px 6px", cursor: "pointer" }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(task)}
                  style={{ background: "blue", color: "white", border: "none", borderRadius: "4px", padding: "2px 6px", cursor: "pointer" }}
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(task.id)}
                style={{ background: "red", color: "white", border: "none", borderRadius: "4px", padding: "2px 6px", cursor: "pointer" }}
              >
                X
              </button>
            </div>

            {/* --- Task content --- */}
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{ width: "100%", marginTop: "25px", padding: "5px" }}
              />
            ) : (
              <div style={{ marginTop: "20px" }}>
                <h4>{task.text}</h4>
                <p>
                  <strong>Difficulty:</strong> {task.difficulty}
                </p>
                <p>
                  <strong>Deadline:</strong> {task.deadline || "N/A"}
                </p>
                <p style={{ fontSize: "12px", color: "gray" }}>
                  Last Modified: {new Date(task.lastModified).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
