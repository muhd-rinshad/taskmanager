import React, { useEffect, useState } from "react";
import API from "../services/api";

const TaskForm = ({ fetchTasks, editingTask, setEditingTask }) => {
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
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, task);
        alert("Task Updated Successfully");
      } else {
        await API.post("/tasks", task);
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
    <div className="max-w-3xl mx-auto mt-8 bg-slate-900 shadow-lg rounded-xl p-6 border border-slate-700">
      <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
       
        <div>
          <label className="block mb-2 font-medium text-slate-200">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        
        <div>
          <label className="block mb-2 font-medium text-slate-200">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter task description"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          ></textarea>
        </div>

     
        <div>
          <label className="block mb-2 font-medium text-slate-200">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        
        <div>
          <label className="block mb-2 font-medium text-slate-200">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

       
        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;