"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaUsers } from "react-icons/fa";

const Navbar = () => {
  const [active, setActive] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <FaHome />, url:"/dashboard" },
    { name: "Community", icon: <FaUsers /> },
  ];

  return (
    <div className="hidden sm:flex gap-2 justify-center">
      {menuItems.map((item) => (
        <Link href={item.url? item.url : "/dashboard"}
          key={item.name}
          className={`relative flex items-center justify-center  px-3 py-2 rounded-full transition-[width,background-color] duration-400 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
            active === item.name
              ? `bg-black text-white px-5 py-3 shadow-lg scale-105 ${
                  item.name === "Community" ? "w-[120px]" : "w-24"
                }`
              : "bg-[#ececec] text-gray-500 w-12"
          } cursor-pointer`}
          onClick={() => setActive(item.name)}
        >
          <span className="text-[15px]">{item.icon}</span>
          <span
            className={`overflow-hidden text-[10px] transition-all duration-400 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
              active === item.name ? "opacity-100 w-auto ml-1" : "opacity-0 w-0"
            }`}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
