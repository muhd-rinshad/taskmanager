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
    <nav className="border-b border-slate-800/70 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-600 text-lg font-semibold shadow-lg">
              T
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-wide">Task Manager</h1>
              <p className="text-sm text-slate-400">Stay ahead of your day</p>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex w-full max-w-md gap-2 sm:w-[280px]">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search tasks..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-sky-600 px-4 py-2 font-medium text-white transition hover:bg-sky-700"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="hidden rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 md:inline-flex">
            Welcome, User
          </span>

          <button
            onClick={() => navigate("/profile")}
            className="rounded-xl bg-violet-600 px-4 py-2 font-medium text-white transition hover:bg-violet-700"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 font-medium text-slate-100 transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;