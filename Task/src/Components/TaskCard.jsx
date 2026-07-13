import React from "react";
import API from "../services/api";

const TaskCard = ({ task, onDelete, onEdit }) => {
  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/${task._id}`);
      if (onDelete) {
        onDelete(task._id);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow-lg p-5 border border-slate-700 w-full">
      <h2 className="text-2xl font-bold text-slate-100">
        {task.title}
      </h2>

      <p className="text-slate-300 mt-3">
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-6">
        <span
          className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${
            task.status === "Pending"
              ? "bg-yellow-500"
              : task.status === "In Progress"
              ? "bg-blue-500"
              : "bg-green-500"
          }`}
        >
          {task.status}
        </span>

        <span className="text-slate-400 text-sm">
          📅 {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;