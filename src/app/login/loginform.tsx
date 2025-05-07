"use client";
import { signIn } from "next-auth/react";
import React, { FormEvent, useState } from "react";

export default function Loginform() {
  const [email, setEmail] = useState<string>(""); // Changed to email
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>(""); // Added error state for validation

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation for email
    if (!email) {
      setError("Email is required.");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
      console.log("Email:", email, "Password:", password);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mt-[5vh] max-sm:text-[18px]"
    >
      {/* Email Input */}
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-[#666666]"
          }`}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Password Input */}
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#666666]"
          required
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-dark-gray hover:bg-like-gray text-white font-medium py-3 max-sm:mt-8 max-sm:py-4 rounded-full transition-colors duration-200 shadow-[0px_4px_8px_rgba(0,0,0,0.2)]"
      >
        Login
      </button>
    </form>
  );
}
