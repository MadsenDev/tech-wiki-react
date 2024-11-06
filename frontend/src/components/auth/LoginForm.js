// src/components/auth/LoginForm.js
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import Button from "../common/Button";
import Input from "../common/Input";

const LoginForm = ({ onClose }) => {
  const { login } = useUser();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      onClose(); // Close the modal after a successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 p-4 text-center">
      <h2 className="text-xl font-semibold text-primary mb-4">Welcome Back!</h2>
      <p className="text-sm text-neutral-600 mb-4">Please enter your credentials to continue</p>
      <div className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
          className="px-4 py-2 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="px-4 py-2 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <Button type="submit" variant="primary" className="w-full py-3 mt-4 rounded-lg shadow-md hover:shadow-lg">
        Login
      </Button>
      <div className="mt-6 text-sm text-neutral-500">
        <a href="/forgot-password" className="hover:text-primary">
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;