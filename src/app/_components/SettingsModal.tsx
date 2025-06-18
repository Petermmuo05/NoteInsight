"use client";

import React, { useEffect, useState } from "react";
import { Modal, useTheme, useMediaQuery } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import {
  FaTimes,
  FaUser,
  FaPaintBrush,
  FaTags,
  FaSun,
} from "react-icons/fa";
import { Tag } from "../_lib/definitions";
import TagTab from "./TagTab";
import SettingsDrawer from "./SettingsDraggable";
import ProfileTab from "./ProfileTab";

export default function SettingsModal({
  tags,
  token,
}: {
  tags: Tag[];
  token: string | undefined;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "settings";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // No need for openNotMobile state if its only purpose is to exclude mobile
  // Mobile fallback is handled by SettingsDrawer
  // const [openNotMobile, setOpenNotMobile] = useState(false);
  // useEffect(() => {
  //   setOpenNotMobile(isMobile);
  // }, [isMobile]);

  // Use a state to control the visibility of the Modal for desktop,
  // independent of the framer-motion closing state.
  // This will primarily be `isOpen && !isMobile`
  const [showModalContent, setShowModalContent] = useState(false);

  useEffect(() => {
    if (isOpen && !isMobile) {
      setShowModalContent(true);
    } else if (!isOpen && showModalContent) {
      // This is the trigger for closing when isOpen becomes false
      // AnimatePresence will handle the exit animation
      // No need for a separate `closing` state or `setTimeout` here.
      // The `onClose` prop of Modal will handle the URL update after animation.
      // setShowModalContent(false); // This will be handled by AnimatePresence removal
    }
  }, [isOpen, isMobile, showModalContent]);

  const handleClose = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("modal");
    router.push(`?${params.toString()}`);
    // setShowModalContent(false); // This is automatically handled by the router push changing `isOpen`
  };

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Profile", icon: <FaUser /> },
    { label: "Appearance", icon: <FaPaintBrush /> },
    { label: "Tags", icon: <FaTags /> },
  ];

  return (
    <>
      {/* Conditionally render Modal only for non-mobile and when it should be open */}
      {!isMobile && (
        <Modal
          open={isOpen} // Control Modal's open state directly with `isOpen` from URL
          onClose={handleClose} // Use the direct close handler
          closeAfterTransition // Let MUI Modal handle its own transition logic (though AnimatePresence will override for its children)
          slotProps={{
            backdrop: { className: "custom-backdrop" },
          }}
        >
          {/* AnimatePresence will handle mounting/unmounting with animations */}
          <AnimatePresence>
            {/* Render motion.div only when isOpen is true (or during exit animation) */}
            {isOpen && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }} // This is the exit animation
                transition={{ duration: 0.25 }}
                className="
                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[500px] md:w-[600px] h-[400px]
                  hidden sm:flex flex-col overflow-hidden
                  bg-[#1F1F1F] rounded-[8px] shadow-2xl z-20
                "
              >
                {/* Header */}
                <div className="flex items-center px-4 py-3 border-b border-[#333] flex-shrink-0">
                  <h2 className="flex-grow text-white text-lg m-0">Settings</h2>
                  <button
                    onClick={handleClose} // Use the direct close handler
                    className="p-1 text-[#888] hover:text-white transition"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Body */}
                <div className="flex flex-grow overflow-hidden">
                  {/* Sidebar Tabs */}
                  <nav className="w-40 bg-[#2A2A2A] border-r border-[#333] px-3 py-2 overflow-y-auto flex-shrink-0">
                    {tabs.map((tab, idx) => (
                      <div
                        key={tab.label}
                        onClick={() => setActiveTab(idx)}
                        className={`
                          flex items-center gap-2 px-4 py-2 mb-2
                          rounded-lg cursor-pointer text-sm
                          transition-colors
                          ${
                            activeTab === idx
                              ? "bg-[#333] text-white"
                              : "text-[#AAA] hover:bg-white/5"
                          }
                        `}
                      >
                        {tab.icon}
                        {tab.label}
                      </div>
                    ))}
                  </nav>

                  {/* Content */}
                  <div className="flex-grow p-4 text-[#EEE] overflow-y-auto">
                    {activeTab === 0 && <ProfileTab />}
                    {activeTab === 1 && (
                      <div className="flex flex-col h-full">
                        <h3 className="mb-3">Theme Preference</h3>
                        <div className="flex gap-4 h-1/3">
                          {/* <div className="flex-1 flex items-center justify-center gap-2 border border-white rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors p-2">
                            <FaMoon size={16} /> Dark
                          </div> */}
                          <div className="flex-1 flex items-center justify-center gap-2 border border-white rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors p-2">
                            <FaSun size={16} /> Light
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 2 && <TagTab tags={tags} token={token} />}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Modal>
      )}

      {/* Mobile fallback: Render SettingsDrawer always if isOpen and on mobile */}
      {isOpen && isMobile && <SettingsDrawer tags={tags} token={token} />}
    </>
  );
}
