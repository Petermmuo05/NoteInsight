"use client";
import { useModal } from "@/app/dashboard/modal_context";
import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const { isUploading } = useModal();

  const steps = ["Analyzing document", "Generating Summary", "Working on Quiz"];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isUploading) return;
    setStep(0);
    const timeouts = [
      setTimeout(() => setStep(1), 2000),
      setTimeout(() => setStep(2), 4000),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, [isUploading]);

  return (
    isUploading && (
      <div className="bg-black w-full inset-0 z-50 flex flex-col justify-center items-center fixed h-full opacity-20">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-light-gray rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-light-gray rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-light-gray rounded-full animate-bounce [animation-duration:0.5s]"></div>
        </div>
        {/* <div className="loader z-10"></div> */}
        <div className="z-20 mt-6 text-sm text-light-gray drop-shadow">
          {steps[step]}...
        </div>
      </div>
    )
  );
}
