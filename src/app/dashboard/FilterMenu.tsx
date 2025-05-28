"use client";
import React, { useState } from "react";
import {
  Menu,
  Grow,
  Switch,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useModal } from "@/app/dashboard/modal_context";
import { Tag } from "../_lib/definitions";
import { FaFilter } from "react-icons/fa";

const FilterMenu = ({ tags }: { tags: Tag[] }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { selectedTag, setSelectedTag, setIsOnlyFavorites, isOnlyFavorites } =
    useModal();
  const open = Boolean(anchorEl);

  // Handle opening the menu
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle toggle change
  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsOnlyFavorites(event.target.checked);
    console.log("Favorites toggled:", event.target.checked);
  };

  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div>
      {/* Profile Icon (Clickable Div) */}
      <div
        onClick={handleClick}
        className="absolute right-3 top-1/2 cursor-pointer hover:scale-102 active:scale-90 transition-all duration-200 ease-in-out transform -translate-y-1/2 text-gray-400"
      >
        <FaFilter size={15} color="#666666" />
      </div>

      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        slots={{
          transition: Grow,
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "gray",
              borderRadius: "12px",
              marginTop: "12px",
              padding: "10px", // Adjust padding for better spacing
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)", // Softer shadow
              background: "#f9f9f9", // Light background
              color: "#333333", // Darker text color
              width: "250px", // Wider modal
              maxHeight: "300px", // Limit height for better appearance
              overflowY: "auto", // Add scroll for overflow
            },
          },
          list: {
            sx: {
              padding: 0,
            },
          },
        }}
      >
        {/* Filters Header */}
        <div className="w-full px-3 py-2 text-[14px] font-semibold text-gray-800 border-b border-gray-300">
          Filters
        </div>

        {/* Favorites Toggle */}
        <div className="w-full px-5 py-2 gap-2 text-[14px] mb-2 text-gray-800  cursor-pointer transition-colors duration-200 ease-in-out flex justify-between items-center rounded-lg">
          <span>Favorites</span>
          <Switch
            checked={isOnlyFavorites}
            onChange={handleToggleChange}
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#4caf50", // Green toggle color when checked
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#4caf50", // Green track when checked
              },
            }}
          />
        </div>

        {/* Category Select Field */}
        <div className="w-full px-3 gap-2 text-[14px] text-gray-800  cursor-pointer transition-colors duration-200 ease-in-out flex justify-between items-center rounded-lg">
          <FormControl fullWidth>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedTag == undefined ? -1 : selectedTag}
              onChange={(event) =>
                setSelectedTag(
                  (event.target.value as number) == -1
                    ? undefined
                    : (event.target.value as number)
                )
              }
              displayEmpty
              sx={{
                height: "40px", // Match height of the Favorites div
                backgroundColor: "transparent", // Transparent background
                border: "none", // Remove border for a cleaner look
                "& .MuiSelect-select": {
                  padding: "10px", // Remove padding for alignment
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-dark-gray) !important",
                },
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Add hover effect
                },
              }}
            >
              <MenuItem value={-1}>All</MenuItem>
              {tags.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {capitalizeFirstLetter(cat.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Menu>
    </div>
  );
};

export default FilterMenu;
