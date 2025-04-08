"use client";
import React, { useState } from "react";
import { Menu, MenuItem, Grow } from "@mui/material";
import Image from "next/image";
import Profile from "../../../../public/profilehuman.jpg"; // Replace with your profile image path

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle opening the menu
  const handleClick = (event) => {
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
        <Image src={Profile} className="w-8 h-10" alt="Profile" />
      </div>

      {/* MUI Menu with Smooth Transition */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true} // Prevents scrollbar from disappearing
        TransitionComponent={Grow} // Smooth grow animation
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        PaperProps={{
          style: {
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            width:"150px"
          },
        }}
      >
        <div className="w-full h-6  hover:bg-gray-700 flex items-center  rounded-lg">Name</div>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
