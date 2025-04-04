"use client"
import { useState } from "react";
import { FaBell } from "react-icons/fa";

const NotificationBell = () => {
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500); // Reset shake after animation
  };

  return (
    <div onClick={triggerShake} className="cursor-pointer">
      <FaBell 
        className={`transition-transform ${shake ? "shake-animation ease-in-out" : ""}`} 
        color="black"
        size={18}
      />
    </div>
  );
};

export default NotificationBell;
