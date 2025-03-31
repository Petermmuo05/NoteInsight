"use client";
import { useState } from "react";
import { FaHome, FaListAlt, FaReceipt } from "react-icons/fa";

const Navbar = () => {
  const [active, setActive] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Tasks", icon: <FaListAlt /> },
    { name: "Receipts", icon: <FaReceipt /> },
  ];

  return (
    <div className="flex gap-2 justify-center">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`relative flex items-center justify-center  px-3 py-2 rounded-full transition-[width,background-color] duration-400 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
            active === item.name
              ? "bg-black text-white px-5 py-3 shadow-lg scale-105 w-24"
              : "bg-[#ececec] text-gray-500 w-12"
          } cursor-pointer`}
          onClick={() => setActive(item.name)}
        >
          <span className="text-[15px]">{item.icon}</span>
          <span
            className={`overflow-hidden text-[9px] transition-all duration-400 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
              active === item.name ? "opacity-100 w-auto ml-1" : "opacity-0 w-0"
            }`}
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
