"use client";
import { useState } from "react";
import { FaCog } from "react-icons/fa";

const SettingsIcon = () => {
  const [rotate, setRotate] = useState(false);

  return (
    <div onClick={() => setRotate(!rotate)} className="cursor-pointer">
      <FaCog
        className={`transition-transform duration-500 ${
          rotate ? "rotate-360" : "rotate-0"
        }`}
        size={18}
        color="black"
      />
    </div>
  );
};

export default SettingsIcon;
