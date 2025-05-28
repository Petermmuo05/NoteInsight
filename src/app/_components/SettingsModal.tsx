"use client";

import React, { useEffect, useState } from "react";
import { Modal, useTheme, useMediaQuery } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaTimes,
  FaUser,
  FaPaintBrush,
  FaTags,
  FaMoon,
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
  const [openNotMobile, setOpenNotMobile] = useState(false);

  // --- Start of animation-related additions ---
  const [closing, setClosing] = useState<boolean>(false);

  const handleAnimatedClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      // Original closing logic
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete("modal");
      router.push(`?${params.toString()}`);
    }, 300); // Duration should match your CSS animation
  };
  // --- End of animation-related additions ---

  useEffect(() => {
    setOpenNotMobile(isMobile);
  }, [isMobile]);

  // Original closeModal is now part of handleAnimatedClose
  // const closeModal = () => { ... };

  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Profile", icon: <FaUser /> },
    { label: "Appearance", icon: <FaPaintBrush /> },
    { label: "Tags", icon: <FaTags /> },
  ];

  return (
    <>
      <Modal
        open={isOpen && !openNotMobile}
        onClose={handleAnimatedClose} // Use the new animated close handler
        // Add backdrop class similar to the first example if needed
        slotProps={{
          backdrop: {
            className: "custom-backdrop", // Ensure this class is defined in your CSS
          },
        }}
      >
        <div
          // Apply animation classes and combine with existing/Tailwind styling
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[500px] md:w-[600px] hidden sm:flex flex-col overflow-hidden
            bg-[#1F1F1F] rounded-[8px] shadow-2xl
            ${closing ? "modal-closing" : "modal-animate"}
          `}
          style={{
            // Height is kept as inline style as it was specific, or convert to Tailwind if preferred
            height: 400,
            // Removed other inline styles that are now covered by Tailwind classes
          }}
        >
          {/* Header */}
          <div
            style={{
              // Keeping inline styles for header for brevity, can be converted to Tailwind
              flexShrink: 0,
              padding: "16px",
              borderBottom: "1px solid #333",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#FFF",
                fontSize: "18px",
                flexGrow: 1,
              }}
            >
              Settings
            </h2>
            <button
              onClick={handleAnimatedClose} // Use the new animated close handler
              style={{
                background: "transparent",
                border: "none",
                color: "#888",
                cursor: "pointer",
                padding: 4,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Body: sidebar + content */}
          <div style={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
            {/* Vertical Tabs */}
            <nav
              style={{
                flexShrink: 0,
                width: 160,
                background: "#2A2A2A",
                borderRight: "1px solid #333",
                padding: "0 12px",
                overflowY: "auto",
              }}
            >
              {tabs.map((tab, idx) => (
                <div
                  key={tab.label}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    padding: "8px 16px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    cursor: "pointer",
                    color: activeTab === idx ? "#FFF" : "#AAA",
                    background: activeTab === idx ? "#333" : "transparent",
                    borderBottom: "1px solid #333",
                    transition: "background 0.2s, color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== idx)
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== idx)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </div>
              ))}
            </nav>

            {/* Content */}
            <div
              className="scrollbar-hide"
              style={{
                flexGrow: 1,
                padding: "12px",
                color: "#EEE",
                overflowY: "auto",
              }}
            >
              {activeTab === 0 && <ProfileTab />}
              {activeTab === 1 && (
                <div className="flex flex-col w-full h-full">
                  <h1 className="mb-3">Theme Preference</h1>
                  <div className="flex flex-row w-full h-[30%] gap-4">
                    <div className="w-full border border-white flex items-center rounded-2xl justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                      <FaMoon size={16} />
                      Dark
                    </div>
                    <div className="w-full flex border border-white items-center rounded-2xl justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                      <FaSun size={16} />
                      Light
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 2 && <TagTab tags={tags} token={token} />}
            </div>
          </div>
        </div>
      </Modal>
      {isOpen && <SettingsDrawer tags={tags} token={token} />}
    </>
  );
}
