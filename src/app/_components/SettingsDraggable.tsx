"use client";
import React, { useState, useEffect } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "../../../public/profilehuman.jpg"; // Replace with your profile image path

import {
  faUser,
  faPalette,
  faChevronRight,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme, useMediaQuery } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaSun } from "react-icons/fa";
import { Tag } from "../_lib/definitions";
import SmallTagTab from "./smallTagTab";

const menuItems = [
  { text: "Profile", icon: faUser },
  { text: "Appearance", icon: faPalette },
  { text: "Tags", icon: faTags },
];

const SettingsDrawer = ({
  tags,
  token,
}: {
  tags: Tag[];
  token: string | undefined;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const curTab = searchParams.get("tab");

  const closeModal = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("modal");
    router.push(`?${params.toString()}`);
  };

  const closeTab = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("tab");
    router.push(`?${params.toString()}`);
  };

  const handleOpenTab = (tab: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("tab", tab);
    router.push(`?${current.toString()}`);
  };

  useEffect(() => {
    setOpen(isMobile);
  }, [isMobile]);

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onOpen={toggleDrawer(true)}
      onClose={() => {
        toggleDrawer(false);
        closeModal();
      }}
      disableSwipeToOpen={!isMobile}
      ModalProps={{ keepMounted: true }}
    >
      <div
        style={{
          backgroundColor: "#202020",
          color: "#FFFFFF",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          padding: 16,
          maxHeight: "80vh",
          minHeight: "65vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* handle bar */}
        <div
          style={{
            width: 40,
            height: 4,
            backgroundColor: "#444444",
            borderRadius: 2,
            margin: "0 auto 16px",
          }}
        />
        {/* title */}
        {!curTab && (
          <>
            <div
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 32,
              }}
            >
              Settings
            </div>
            {/* close button */}

            <div>
              {menuItems.map(({ text, icon }) => (
                <React.Fragment key={text}>
                  <div
                    onClick={() => handleOpenTab(text)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "12px 0",
                      cursor: "pointer",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      style={{ minWidth: 20, marginRight: 12 }}
                    />
                    <span style={{ flex: 1, fontSize: 16 }}>{text}</span>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      style={{ minWidth: 16 }}
                    />
                  </div>
                  <div style={{ height: 1, backgroundColor: "#444444" }} />
                </React.Fragment>
              ))}
            </div>
          </>
        )}
        {curTab == "Profile" && (
          <>
            {" "}
            <div className="w-full relative flex items-center justify-center text-[20px] font-semibold mb-[32px]">
              <button
                onClick={() => closeTab()} // Navigate back to the main menu
                className="text-gray-400 border-0 cursor-pointer mr-[8px] bg-transparent absolute left-0 hover:text-white transition-colors"
              >
                <FaArrowLeft size={16} />
              </button>
              <span>Profile</span>
            </div>
            <ProfileTab />
          </>
        )}
        {curTab == "Appearance" && (
          <>
            {" "}
            <div className="w-full relative flex items-center justify-center text-[20px] font-semibold mb-[32px]">
              <button
                onClick={() => closeTab()} // Navigate back to the main menu
                className="text-gray-400 border-0 cursor-pointer mr-[8px] bg-transparent absolute left-0 hover:text-white transition-colors"
              >
                <FaArrowLeft size={16} />
              </button>
              <span>Appearance</span>
            </div>{" "}
            <div className="flex flex-col w-full h-full">
              <div className="flex flex-row w-full  gap-4">
                {/* Dark Theme Option */}
                {/* <div className="w-full h-[70px] border border-white flex items-center rounded-2xl justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                  <FaMoon size={16} />
                  Dark
                </div> */}

                {/* Light Theme Option */}
                <div className="w-full flex border border-white items-center rounded-2xl justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                  <FaSun size={16} />
                  Light
                </div>
              </div>
            </div>
          </>
        )}
        {curTab == "Tags" && (
          <>
            <div className="w-full relative flex items-center justify-center text-[20px] font-semibold mb-[32px]">
              <button
                onClick={() => closeTab()} // Navigate back to the main menu
                className="text-gray-400 border-0 cursor-pointer mr-[8px] bg-transparent absolute left-0 hover:text-white transition-colors"
              >
                <FaArrowLeft size={16} />
              </button>
              <span>Tags</span>
            </div>{" "}
            <SmallTagTab tags={tags} token={token} />
          </>
        )}
      </div>
    </SwipeableDrawer>
  );
};

function ProfileTab() {
  const [name, setName] = useState("Peter Mmuo");
  const [email, setEmail] = useState("mmuopeter737@gmail.com");

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="w-full justify-center mb-3 flex">
        <div className="w-[60px] h-[60px] bg-gray-400 rounded-full flex items-center justify-center overflow-hidden cursor-pointer">
          <Image src={Profile} className="w-[60px]" alt="Profile" />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-400 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-md  text-white border border-dark-gray focus:outline-none focus:ring-2 focus:ring-like-gray"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Email</label>
        <input
          type="email"
          disabled
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-md text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-like-gray"
        />
      </div>
    </div>
  );
}

export default SettingsDrawer;
