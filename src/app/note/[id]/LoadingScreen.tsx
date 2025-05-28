"use client";
import { useModal } from "@/app/dashboard/modal_context";
import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const { isUploading, isCreatingNote } = useModal();

  const steps = ["Analyzing document", "Generating Summary", "Working on Quiz"];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isUploading || !isCreatingNote) return;
    setStep(0);
    const timeouts = [
      setTimeout(() => setStep(1), 2000),
      setTimeout(() => setStep(2), 4000),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, [isUploading, isCreatingNote]);

  return (
    isUploading && (
      <div className="fixed inset-0 z-50 w-full h-full flex items-center justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-20 pointer-events-none" />
        {/* Loader and text */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-duration:0.5s]"></div>
          </div>
          {isCreatingNote && (
            <div className="mt-6 text-sm text-white drop-shadow z-10">
              {steps[step]}...
            </div>
          )}
        </div>
      </div>
    )
  );
}