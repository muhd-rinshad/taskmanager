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

  const statusStyles = {
    Pending: "bg-amber-500/20 text-amber-200 border border-amber-500/30",
    "In Progress": "bg-sky-500/20 text-sky-200 border border-sky-500/30",
    Completed: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30",
  };

  return (
    <div className="group w-full rounded-[24px] border border-slate-800 bg-slate-900/90 p-5 shadow-lg shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:border-sky-500/50">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">Task</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-100">{task.title}</h2>
        </div>

        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[task.status] || statusStyles.Pending}`}>
          {task.status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{task.description}</p>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
        <span className="rounded-full bg-slate-800 px-3 py-1">{task.status === "Completed" ? "Done" : "In progress"}</span>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 rounded-xl bg-sky-600 py-2.5 font-medium text-white transition hover:bg-sky-700"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 rounded-xl bg-rose-600 py-2.5 font-medium text-white transition hover:bg-rose-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;