"use client";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDonateModal } from "./DonateModalContext";
import logo from "../../../public/noteInsight_logo.png";

const themes = [
  {
    background: "from-cyan-100 to-cyan-300",
    textColor: "text-cyan-900",
    primaryButtonBg: "bg-cyan-600 hover:bg-cyan-700",
    primaryButtonText: "text-white",
    secondaryButtonBg: "bg-gray-200 ",
    secondaryButtonText: "text-gray-800",
  },
  {
    background: "from-lime-100 to-lime-300",
    textColor: "text-lime-900",
    primaryButtonBg: "bg-lime-600 hover:bg-lime-700",
    primaryButtonText: "text-white",
    secondaryButtonBg: "bg-gray-200",
    secondaryButtonText: "text-gray-800",
  },
  {
    background: "from-purple-100 to-purple-300",
    textColor: "text-purple-900",
    primaryButtonBg: "bg-purple-600 hover:bg-purple-700",
    primaryButtonText: "text-white",
    secondaryButtonBg: "bg-gray-200",
    secondaryButtonText: "text-gray-800",
  },
];

const DonationModal: React.FC = () => {
  const router = useRouter();
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const { isModalOpen, closeModal } = useDonateModal();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * themes.length);
    setCurrentTheme(themes[randomIndex]);
  }, []);

  const handleDonate = () => {
    router.push("/donate");
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={(event, reason) => {
        // Prevent closing on backdrop click or ESC
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        closeModal();
      }}
      aria-labelledby="donate-modal-title"
      aria-describedby="donate-modal-description"
      disableEscapeKeyDown
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xs rounded-3xl bg-gradient-to-br ${currentTheme.background} p-6 text-center shadow-2xl transform transition-all duration-500 ease-in-out animate-custom-pulse font-sans`}
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        }}
      >
        <Image
          src={logo}
          alt="noteInsight"
          className="mx-auto mb-4 h-12 w-12 rounded-full object-contain"
        />
        <p
          className={`mb-6 text-sm font-medium ${currentTheme.textColor} leading-relaxed`}
        >
          NoteInsight is free and ad-free. Your donation keeps our mission
          alive!🥺
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            className={`${currentTheme.primaryButtonBg} ${currentTheme.primaryButtonText} rounded-xl px-[1.2rem] py-[0.8rem] text-sm font-semibold transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500`}
            onClick={handleDonate}
            aria-label="Donate now"
          >
            Donate Now🥺
          </button>
          <button
            className={`${currentTheme.secondaryButtonBg} ${currentTheme.secondaryButtonText} rounded-xl px-4 py-2 h-fit w-fit text-sm font-medium transition-transform hover:scale-101 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400`}
            onClick={closeModal}
            aria-label="Not yet"
          >
            Not Yet😭
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DonationModal;
