"use client";
import React, { FormEvent, useState } from "react";

export default function SignUpform() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // New state for confirm password

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle signup logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mt-[3vh] max-sm:text-[18px] text-[15px]"
    >
      {/* Email Input */}
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#666666]"
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
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#666666]"
          required
        />
      </div>

      {/* Confirm Password Input */}
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#666666]"
          required
        />
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full bg-dark-gray hover:bg-like-gray text-white font-medium py-3 max-sm:mt-8 max-sm:py-4 rounded-full  transition-colors duration-200 shadow-[0px_4px_8px_rgba(0,0,0,0.2)]"
      >
        Sign Up
      </button>
    </form>
  );
}
