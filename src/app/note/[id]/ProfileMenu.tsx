"use client";
import React, { useState } from "react";
import { Menu, Grow } from "@mui/material";
import Image from "next/image";
import Profile from "../../../../public/profilehuman.jpg"; // Replace with your profile image path
import { MdLogout, MdSettings } from "react-icons/md";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Session } from "next-auth";

const ProfileMenu = ({ session }: { session: Session | null }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpenSettings = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("modal", "settings");
    router.push(`?${current.toString()}`);
  };

  // Handle opening the menu
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Profile Icon (Clickable Div) */}
      <div
        className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={handleClick}
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Image
          src={session?.user?.image || Profile}
          width={80}
          height={100}
          alt="Profile"
        />
      </div>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        slots={{
          transition: Grow, // 👈 NEW way to set transition component
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "10px",
              padding: "5px 5px", // 👈 Custom padding inside the paper
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#999999",
              color: "#000000",
              width: "120px",
            },
          },
          list: {
            sx: {
              padding: 0, // 👈 Removes inner MenuList padding
            },
          },
        }}
      >
        <div
          onClick={() => {
            handleOpenSettings();
            handleClose();
          }}
          className="w-full flex sm:hidden px-2 py-4 gap-1 h-6 text-[14px] text-white hover:bg-[#aeaeae] cursor-pointer transition-colors duration-200 ease-in-out  items-center rounded-lg"
        >
          <MdSettings className="" />
          <span>Settings</span>
        </div>
        <div className="w-full px-2 py-4 gap-1 h-6 text-[14px] text-white hover:bg-[#aeaeae] cursor-pointer transition-colors duration-200 ease-in-out flex items-center rounded-lg">
          <MdLogout className="" />
          <Link href="api/auth/signout">Log Out</Link>
        </div>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
