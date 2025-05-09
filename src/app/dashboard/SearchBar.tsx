"use client";
import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import FilterMenu from "./FilterMenu";
import { Tag } from "../_lib/definitions";
import { useModal } from "./modal_context";

export default function SearchBar({ tags }: { tags: Tag[] }) {
  const {
    titleFilter,
    setTitleFilter,
    isOnlyFavorites,
    selectedTag,
    closeFilter,
  } = useModal();
  return (
    <div className="flex flex-row items-center gap-1">
      <div className="relative text-[14px]">
        <input
          type="text"
          placeholder="Search..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="px-8 py-2 sm:w-[200px]  rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#666666]"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FaSearch size={15} color="#666666" />
        </div>
        <FilterMenu tags={tags} />
      </div>
      {(isOnlyFavorites !== undefined ||
        selectedTag !== undefined ||
        titleFilter !== "") && (
        <button
          onClick={closeFilter}
          className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
          aria-label="Clear Search"
        >
          <FaTimes size={14} />
        </button>
      )}
    </div>
  );
}
