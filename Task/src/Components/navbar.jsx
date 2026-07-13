import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchValue.trim();
    onSearch?.(trimmedQuery);
    navigate(trimmedQuery ? `/search?query=${encodeURIComponent(trimmedQuery)}` : "/search");
  };

  return (
    <nav className="bg-linear-to-r from-indigo-900 via-violet-900 to-slate-950 text-slate-100 shadow-xl border-b border-violet-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-wide">
            Task Manager
          </h1>

          <form onSubmit={handleSearchSubmit} className="flex w-full max-w-xs gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search tasks..."
              className="flex-1 bg-slate-900/70 border border-violet-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
            <button
              type="submit"
              className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-fuchsia-700 transition duration-300"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-slate-300 text-sm">
            Welcome, User
          </span>

          <button
            onClick={() => navigate("/profile")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-slate-700/80 text-slate-100 px-4 py-2 rounded-lg font-medium hover:bg-slate-600 transition duration-300"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;