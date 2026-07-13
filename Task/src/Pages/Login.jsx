import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", user);

console.log(res.data);
console.log(res.data.token);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminName", res.data.user?.name || "");
      localStorage.setItem("adminEmail", res.data.user?.email || "");
      localStorage.setItem("adminUser", JSON.stringify(res.data.user || {}));

      alert("Login Successful");

      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950">

      <div className="bg-slate-900 p-8 rounded-xl shadow-lg w-full max-w-md mx-4 border border-slate-700">

        <h1 className="text-3xl font-bold text-center text-sky-400 mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <p className="text-slate-300 text-center mt-5">
          Don't have an account?
          <Link
            to="/register"
            className="text-sky-400 font-semibold ml-2"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;