import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);

    if (!result.success) {
      setError("Invalid email or password");
      return;
    }

    if (result.userRole === "CUSTOMER") {
      navigate("/customer");
    } else if (result.userRole === "VENDOR") {
      navigate("/vendor/create");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          New user?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
