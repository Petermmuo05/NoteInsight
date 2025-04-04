"use client";
import React from "react";
import { FaStar } from "react-icons/fa";

export default function Star({ size = "1.5rem" }: { size?: string }) {
  const [active, setActive] = React.useState(false);
  return (
    <FaStar
      size={size}
      className={`cursor-pointer active:scale-90 hover:scale-102 ${`w-${size}`} transition-all duration-200 ease-in-out ${
        active ? "text-black" : "text-white stroke-black stroke-[15] "
      }`}
      onClick={(e) => {
        setActive(!active);
        e.preventDefault();
        e.stopPropagation();
      }}
    />
  );
}
