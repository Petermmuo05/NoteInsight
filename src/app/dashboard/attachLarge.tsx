"use client";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useModal } from "./modal_context";

export default function AttachFile() {
  const { openModal } = useModal();
  return (
    <div
      onClick={openModal}
      className="px-4 py-2 hidden bg-black text-white rounded-full shadow-md sm:flex items-center justify-center gap-1 
             transition-all active:scale-98 no-select duration-200 ease-in-out hover:bg-like-gray hover:scale-105 hover:shadow-lg"
    >
      <FaPlus size={15} color="white" />
      <p className="text-[14px] font-medium">Create</p>
    </div>
  );
}
