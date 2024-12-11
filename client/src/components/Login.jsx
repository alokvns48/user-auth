// src/components/Login.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      alert(response.data.message);
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      alert("Login failed: " + error.response.data.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-10">OTP Based Login System</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col p-8 space-y-4 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-20"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Login
        </button>
        <p>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
