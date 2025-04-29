import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://consultancy.scholarnet.in/api/core/login/", formData);
      
      const { access, refresh, role } = res.data;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify({ token: access, refresh, role }));

      // Redirect or show success
      alert("Login successful!");
      navigate("/dashboard"); // Or wherever you want to go after login
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Login</h2>
      {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
