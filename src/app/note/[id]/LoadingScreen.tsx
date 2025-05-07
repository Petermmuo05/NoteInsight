"use client";
import { useModal } from "@/app/dashboard/modal_context";
import React from "react";

export default function LoadingScreen() {
  const { isUploading } = useModal();
  return (
    isUploading && (
      <div className="bg-black w-full inset-0 z-50 flex justify-center items-center fixed h-full opacity-20">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-dark-gray rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-dark-gray rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-dark-gray rounded-full animate-bounce [animation-duration:0.5s]"></div>
        </div>
      </div>
    )
  );
}
