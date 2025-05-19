"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaCog } from "react-icons/fa";

const SettingsIcon = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rotate, setRotate] = useState(false);

  const handleOpen = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("modal", "settings");
    router.push(`?${current.toString()}`);
  };

  return (
    <div
      onClick={() => {
        setRotate(!rotate);
        handleOpen();
      }}
      className="cursor-pointer"
    >
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
