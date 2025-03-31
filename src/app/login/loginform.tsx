"use client";
import React, { FormEvent, useState } from "react";

export default function Loginform() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email, "Password:", password);
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
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Password Input */}
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3  rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-3 max-sm:mt-8 max-sm:py-4 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-[0px_4px_8px_rgba(0,0,0,0.2)]"
      >
        Login
      </button>
    </form>
  );
}
