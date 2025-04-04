"use client";
import React from "react";
import { FaStar } from "react-icons/fa";

export default function NoteStar() {
  const [active, setActive] = React.useState(false);
  return (
    <FaStar
      className={`cursor-pointer active:scale-90 hover:scale-102 text-[1.7rem] sm:text-[1.8rem] md:text-[2.1rem] lg:text-[2.5rem] transition-all duration-200 ease-in-out ${
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
