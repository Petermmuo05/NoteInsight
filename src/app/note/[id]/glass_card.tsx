// components/GlassCard.jsx
import React from "react";
import { FaFile } from "react-icons/fa";

export default function FrostedGlassBox() {
  return (
    <div
      className="
          relative 
          flex
          no-select
          flex-row
          bg-opacity-30 
          backdrop-blur-lg 
          border border-white border-opacity-20 
          rounded-xl 
          shadow-xl 
          items-center
          inset-0
          bg-white/70     /* Semi-transparent white overlay */
          lg:w-[400px]
          md:w-[280px]

          p-3 
          gap-2
            transition-all duration-300 ease-in-out 
          hover:scale-105 
          hover:shadow-2xl 
          active:scale-95
        "
    >
      <div className="flex items-center bg-light-gray p-3 rounded-lg justify-center">
        <FaFile size={20} className="" />
      </div>
      <div className="w-full flex flex-col justify-center h-full gap-1">
        <p className="leading-[100%] text-[14px] sm:text-[16px] font-bold">
          finalProject.docx
        </p>
        <p className="text-[12px] sm:text-sm leading-[100%]">Document</p>
      </div>
    </div>
  );
}
