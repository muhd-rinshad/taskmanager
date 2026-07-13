import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../Components/navbar";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await API.get("/tasks");
        setTasks(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unable to load tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    if (!query) return tasks;

    const normalizedQuery = query.toLowerCase();
    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";
      return title.includes(normalizedQuery) || description.includes(normalizedQuery);
    });
  }, [query, tasks]);

  const handleSearch = (value) => {
    const trimmed = value.trim();
    navigate(trimmed ? `/search?query=${encodeURIComponent(trimmed)}` : "/search");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar onSearch={handleSearch} />

      <div className="p-8">
        <div className="max-w-7xl mx-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-lg p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-100">Search Results</h1>
              <p className="text-slate-400 mt-2">Showing results for "{query}"</p>
            </div>
            <button
              onClick={() => navigate("/home")}
              className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg"
            >
              Back to Home
            </button>
          </div>

          {loading ? (
            <div className="text-slate-300 text-lg">Loading tasks...</div>
          ) : error ? (
            <div className="text-rose-400 text-lg">{error}</div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-slate-300 text-lg">No tasks found.</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredTasks.map((task) => (
                <div key={task._id} className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
                  <h2 className="text-2xl font-semibold text-slate-100">{task.title}</h2>
                  <p className="text-slate-300 mt-3">{task.description}</p>
                  <p className="text-slate-400 mt-3">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <span className="inline-flex mt-4 rounded-full px-4 py-2 text-sm font-semibold text-white bg-sky-600">
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Search;
