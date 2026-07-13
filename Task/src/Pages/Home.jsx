import { useCallback, useEffect, useMemo, useState } from "react";
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

  const handleTaskSaved = (savedTask, isEditing) => {
    setTasks((prevTasks) => {
      if (isEditing) {
        return prevTasks.map((task) => (task._id === savedTask._id ? savedTask : task));
      }

      return [savedTask, ...prevTasks];
    });
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await API.get("/tasks");
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

  const taskSummary = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "Completed").length;
    const pending = tasks.filter((task) => task.status === "Pending").length;

    return {
      total: tasks.length,
      pending,
      completed,
    };
  }, [tasks]);

  return (
    <main className="app-shell min-h-screen text-slate-100">
      <Navbar onSearch={setSearchQuery} />

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[28px] border border-slate-800/70 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-400">Productivity dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Organize your work with a calm, focused workspace.</h1>
              <p className="mt-3 text-base text-slate-300 sm:text-lg">Capture tasks, track progress, and keep your day moving forward from one sleek dashboard.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Total tasks</p>
                <p className="mt-2 text-2xl font-semibold text-white">{taskSummary.total}</p>
              </div>
              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Pending</p>
                <p className="mt-2 text-2xl font-semibold text-amber-300">{taskSummary.pending}</p>
              </div>
              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Completed</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-300">{taskSummary.completed}</p>
              </div>
              {/* <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Focus mode</p>
                <p className="mt-2 text-sm font-semibold text-sky-300">Always on</p>
              </div> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(300px,360px)_minmax(0,1fr)]">
          <TaskForm fetchTasks={fetchTasks} editingTask={editingTask} setEditingTask={setEditingTask} onTaskSaved={handleTaskSaved} />

          <div className="min-w-0">
            {loading ? (
              <div className="rounded-[24px] border border-slate-800/70 bg-slate-900/70 p-8 text-center text-lg text-slate-300">
                Loading tasks...
              </div>
            ) : error ? (
              <div className="rounded-[24px] border border-rose-700/40 bg-rose-950/40 p-8 text-center text-lg text-rose-300">
                {error}
              </div>
            ) : (
              <TaskList tasks={filteredTasks} onDelete={handleDelete} onEdit={handleEdit} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;