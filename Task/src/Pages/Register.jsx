import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
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
      const res = await API.post("/auth/register", user);

      console.log("Register Success:", res.data);

      localStorage.setItem("adminName", res.data.user?.name || user.name || "");
      localStorage.setItem("adminEmail", res.data.user?.email || user.email || "");
      localStorage.setItem("adminUser", JSON.stringify(res.data.user || { name: user.name, email: user.email }));

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
       console.log("Register Error:", err.response?.data);
  console.log(err);
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-xl shadow-lg w-full max-w-md mx-4 border border-slate-700">

        <h1 className="text-3xl font-bold text-center text-sky-400 mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />

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
            Register
          </button>

        </form>

        <p className="text-slate-300 text-center mt-5">
          Already have an account?
          <Link
            to="/login"
            className="text-sky-400 font-semibold ml-2"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;