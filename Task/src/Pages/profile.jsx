import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [admin, setAdmin] = useState({ name: "Admin", email: "" });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("adminUser");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      setAdmin({
        name: parsedUser?.name || localStorage.getItem("adminName") || "Admin",
        email: parsedUser?.email || localStorage.getItem("adminEmail") || "",
      });
    } catch (error) {
      console.error("Error loading profile data:", error);
      setAdmin({ name: "Admin", email: "" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-400">Profile</p>
              <h1 className="mt-2 text-3xl font-semibold">Admin Account</h1>
            </div>
            <Link
              to="/home"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
            >
              Back to Home
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-600 text-2xl font-semibold">
              {admin.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-slate-400">Full Name</p>
                <p className="text-xl font-semibold text-slate-100">{admin.name}</p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-xl font-semibold text-slate-100">{admin.email || "Not available"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
