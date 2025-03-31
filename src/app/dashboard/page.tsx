import { Open_Sans, Playfair_Display_SC } from "next/font/google";
import React from "react";
import Navbar from "./navbar";
import Image from "next/image";
import Profile from "../../../public/profilehuman.jpg";
import Trash from "../../../public/trash.svg";

import File from "../../../public/file3.svg";

import {
  FaStar,
  FaBell,
  FaCog,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const playFair = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function Dashboard() {
  return (
    <div
      className={`flex ${openSans} gap-4 flex-col bg-[#f9f8f6] text-[#1b140e] p-4 h-screen`}
    >
      <div className="flex flex-row items-center justify-between w-full ">
        <h2
          className={`text-2xl font-[800] ${playFair.className} text-[#1C2526]`}
        >
          NoteInsight
        </h2>
        <Navbar />
        <div className="flex flex-row items-center gap-2">
          <div className="hidden md:flex  w-8 h-8 items-center justify-center bg-white rounded-full">
            <FaCog size={18} color="black" />
          </div>
          <div className="hidden w-8 md:flex h-8 items-center justify-center bg-white rounded-full">
            <FaBell size={18} color="black" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden">
              <Image src={Profile} className="w-8 h-10" alt="Globe" />
            </div>
            <p className="hidden md:inline text-md font-bold ">Hi, Joshua</p>
          </div>
        </div>
      </div>
      <div className="w-full cursor-pointer  flex gap-2 sm:justify-end">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-8 py-2 sm:w-[200px]  rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#666666]"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch size={15} color="#666666" />
          </div>
        </div>
        <div
          className="px-4 py-2 hidden bg-black text-white rounded-full shadow-md sm:flex items-center justify-center gap-1 
             transition-all duration-200 ease-in-out hover:bg-like-gray hover:scale-105 hover:shadow-lg"
        >
          <FaPlus size={15} color="white" />
          <p className="text-[14px] font-medium">Create</p>
        </div>
      </div>
      <div className="w-full max-h-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 rounded-lg">
        <div
          className="
          fixed bottom-6 right-6
          bg-dark-gray 
          text-white
          w-14 h-14
          rounded-full
          flex items-center justify-center
          shadow-[0px_5px_15px_rgba(0,0,0,0.4)]
          hover:shadow-2xl
          hover:scale-105
          active:shadow-md
          active:scale-95
          transition-all duration-300
          sm:hidden
          xs:bottom-8 xs:right-8
          xs:w-16 xs:h-16
        "
        >
          <FaPlus size={20} />
        </div>

        <div className="flex flex-row transition-all duration-200 ease-in-out hover:scale-102 hover:opacity-80  justify-between items-start bg-white rounded-lg shadow-md h-[180px] sm:h-[200px] p-2 py-4 sm:p-4">
          <Image src={File} className="w-10" alt="file" />
          <div className="basis-[70%] flex flex-col h-full gap-2 items-start justify-between">
            <div className="w-full flex flex-col gap-3">
              <p className="text-2xl font-[800] text-[#1C2526]">Lecture 1</p>
              <p className="text-[#666666] text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                lacinia, nisl nec condimentum.
              </p>
            </div>
            <div className="px-4 py-2 bg-[#999999] w-fit text-white rounded-full shadow-md flex items-center justify-center gap-1">
              <p className="sm:text-[14px] text-[13px] font-bold">Physics</p>
            </div>{" "}
          </div>
          <div className="flex flex-row items-start">
            <FaStar size={25} color="#1C2526" className="cursor-pointer" />
            <Image src={Trash} className="w-7 cursor-pointer" alt="trash" />
          </div>
        </div>

        <div className="flex flex-row justify-between items-start bg-white rounded-lg shadow-md h-[180px] sm:h-[200px] p-2 py-4 sm:p-4">
          <Image src={File} className="w-10" alt="file" />
          <div className="basis-[70%] flex flex-col h-full gap-2 items-start justify-between">
            <div className="w-full flex flex-col gap-3">
              <p className="text-2xl font-[800] text-[#1C2526]">Lecture 1</p>
              <p className="text-[#666666] text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                lacinia, nisl nec condimentum.
              </p>
            </div>
            <div className="px-4 py-2 bg-[#999999] w-fit text-white rounded-full shadow-md flex items-center justify-center gap-1">
              <p className="sm:text-[14px] text-[13px] font-bold">Physics</p>
            </div>{" "}
          </div>
          <div className="flex flex-row items-start">
            <FaStar size={25} color="#1C2526" className="cursor-pointer" />
            <Image src={Trash} className="w-7 cursor-pointer" alt="trash" />
          </div>
        </div>

        <div className="flex flex-row justify-between items-start bg-white rounded-lg shadow-md h-[180px] sm:h-[200px] p-2 py-4 sm:p-4">
          <Image src={File} className="w-10" alt="file" />
          <div className="basis-[70%] flex flex-col h-full gap-2 items-start justify-between">
            <div className="w-full flex flex-col gap-3">
              <p className="text-2xl font-[800] text-[#1C2526]">Lecture 1</p>
              <p className="text-[#666666] text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                lacinia, nisl nec condimentum.
              </p>
            </div>
            <div className="px-4 py-2 bg-[#999999] w-fit text-white rounded-full shadow-md flex items-center justify-center gap-1">
              <p className="sm:text-[14px] text-[13px] font-bold">Physics</p>
            </div>{" "}
          </div>
          <div className="flex flex-row items-start">
            <FaStar size={25} color="#1C2526" />
            <Image src={Trash} className="w-7" alt="trash" />
          </div>
        </div>

        <div className="flex flex-row justify-between items-start bg-white rounded-lg shadow-md h-[180px] sm:h-[200px] p-2 py-4 sm:p-4">
          <Image src={File} className="w-10" alt="file" />
          <div className="basis-[70%] flex flex-col h-full gap-2 items-start justify-between">
            <div className="w-full flex flex-col gap-3">
              <p className="text-2xl font-[800] text-[#1C2526]">Lecture 1</p>
              <p className="text-[#666666] text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                lacinia, nisl nec condimentum.
              </p>
            </div>
            <div className="px-4 py-2 bg-[#999999] w-fit text-white rounded-full shadow-md flex items-center justify-center gap-1">
              <p className="sm:text-[14px] text-[13px] font-bold">Physics</p>
            </div>{" "}
          </div>
          <div className="flex flex-row items-start">
            <FaStar size={25} color="#1C2526" />
            <Image src={Trash} className="w-7" alt="trash" />
          </div>
        </div>

        <div className="flex flex-row justify-between items-start bg-white rounded-lg shadow-md h-[180px] sm:h-[200px] p-2 py-4 sm:p-4">
          <Image src={File} className="w-10" alt="file" />
          <div className="basis-[70%] flex flex-col h-full gap-2 items-start justify-between">
            <div className="w-full flex flex-col gap-3">
              <p className="text-2xl font-[800] text-[#1C2526]">Lecture 1</p>
              <p className="text-[#666666] text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                lacinia, nisl nec condimentum.
              </p>
            </div>
            <div className="px-4 py-2 bg-[#999999] w-fit text-white rounded-full shadow-md flex items-center justify-center gap-1">
              <p className="sm:text-[14px] text-[13px] font-bold">Physics</p>
            </div>{" "}
          </div>
          <div className="flex flex-row items-start">
            <FaStar size={25} color="#1C2526" />
            <Image src={Trash} className="w-7" alt="trash" />
          </div>
        </div>

        <div className="flex flex-row justify-between items-start bg-white rounded-lg shadow-md h-[180px] sm:h-[200px] p-2 py-4 sm:p-4">
          <Image src={File} className="w-10" alt="file" />
          <div className="basis-[70%] flex flex-col h-full gap-2 items-start justify-between">
            <div className="w-full flex flex-col gap-3">
              <p className="text-2xl font-[800] text-[#1C2526]">Lecture 1</p>
              <p className="text-[#666666] text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                lacinia, nisl nec condimentum.
              </p>
            </div>
            <div className="px-4 py-2 bg-[#999999] w-fit text-white rounded-full shadow-md flex items-center justify-center gap-1">
              <p className="sm:text-[14px] text-[13px] font-bold">Physics</p>
            </div>{" "}
          </div>
          <div className="flex flex-row items-start">
            <FaStar size={25} color="#1C2526" />
            <Image src={Trash} className="w-7" alt="trash" />
          </div>
        </div>
      </div>
    </div>
  );
}
