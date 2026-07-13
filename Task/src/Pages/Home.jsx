import { useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../Components/navbar";
import TaskForm from "../Components/Taskform";
import TaskList from "../Components/TaskList";

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await API.get("/tasks");
      console.log("Tasks:", res.data);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      const message = error.response?.data?.message || "Failed to load tasks.";
      setError(message);

      if (error.response?.status === 401) {
        alert("Please login to access tasks.");
        navigate("/login");
        return;
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, [fetchTasks, navigate]);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return tasks;

    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";
      return title.includes(query) || description.includes(query);
    });
  }, [tasks, searchQuery]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar onSearch={setSearchQuery} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8">
        <TaskForm fetchTasks={fetchTasks} editingTask={editingTask} setEditingTask={setEditingTask} />

        <div className="col-span-2">
          {loading ? (
            <div className="text-slate-300 text-center text-lg">Loading tasks...</div>
          ) : error ? (
            <div className="text-rose-400 text-center text-lg">{error}</div>
          ) : (
            <TaskList tasks={filteredTasks} onDelete={handleDelete} onEdit={handleEdit} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;