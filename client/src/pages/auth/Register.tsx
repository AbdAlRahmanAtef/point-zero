import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organizationName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-6">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Create Account
        </h2>
        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-center text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 focus:outline-none text-white transition-colors"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 focus:outline-none text-white transition-colors"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Organization Name
            </label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 focus:outline-none text-white transition-colors"
              placeholder="Acme Inc."
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 focus:outline-none text-white transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors"
          >
            Register Organization
          </button>
        </form>
        <div className="mt-8 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
