"use client"
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      email:username,
      password,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Sign Up</a>
      </p>
      <p>
        Forgot your password? <a href="/forgot-password">Reset Password</a>
      </p>
      <p>
        Back to <a href="/">Home</a>
      </p>
    </div>
  );
};

export default Login;