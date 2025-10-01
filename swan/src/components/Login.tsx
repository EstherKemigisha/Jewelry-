// src/pages/Login.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add authentication logic here
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-green-800 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;