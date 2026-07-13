import React, { useEffect, useState } from "react";
import API from "../services/api";

const TaskForm = ({ fetchTasks, editingTask, setEditingTask, onTaskSaved }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask) {
      setTask({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "Pending",
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : "",
      });
    } else {
      setTask({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login before saving a task.");
      return;
    }

    try {
      const payload = {
        title: task.title.trim(),
        description: task.description.trim(),
        status: task.status,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
      };

      if (editingTask) {
        const res = await API.put(`/tasks/${editingTask._id}`, payload);
        onTaskSaved?.(res.data, true);
        alert("Task Updated Successfully");
      } else {
        const res = await API.post("/tasks", payload);
        onTaskSaved?.(res.data, false);
        alert("Task Added Successfully");
      }

      if (fetchTasks) {
        await fetchTasks();
      }

      setTask({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
      });
      setEditingTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
      const message = error.response?.data?.message || error.message || "Failed to save task";
      alert(message);
    }
  };

  return (
    <div className="glass-panel sticky top-6 rounded-[28px] border border-slate-800/70 p-6 sm:p-7">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-400">Task composer</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{editingTask ? "Edit task" : "Add a new task"}</h2>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-xl text-sky-300">
          ✎
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block font-medium text-slate-200">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-200">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter task description"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          ></textarea>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-slate-200">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-200">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;