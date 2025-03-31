import { Open_Sans, Playfair_Display_SC } from "next/font/google";
import React from "react";
import Navbar from "./navbar";
import Image from "next/image";
import Profile from "../../../public/profilehuman.jpg";
import Trash from "../../../public/trash.svg";

import File from "../../../public/file3.svg";

import {
  FaStar,
  FaFileUpload,
  FaBell,
  FaCog,
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
          <div className="flex w-8 h-8 items-center justify-center bg-white rounded-full">
            <FaCog size={18} color="black" />
          </div>
          <div className="flex w-8 h-8 items-center justify-center bg-white rounded-full">
            <FaBell size={18} color="black" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden">
              <Image src={Profile} className="w-8 h-10" alt="Globe" />
            </div>
            <p className="text-md font-bold ">Hi, Joshua</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="px-4 py-2 bg-black text-white rounded-full shadow-md flex items-center justify-center gap-1">
          <FaFileUpload size={15} color="white" />
          <p className="text-[14px] font-medium">Create</p>
        </div>
      </div>
      <div className="w-full max-h-full grid grid-cols-3 gap-4 rounded-lg">

        <div className="flex flex-row justify-between items-start bg-white rounded-lg shadow-md h-[200px] p-4">
        <Image src={File} className="w-10" alt="file" />
        <div className="basis-[70%] flex flex-col gap-2 items-start justify-between">
            <div className="w-full flex flex-col gap-2">
              <p className="text-2xl font-[800]">Lecture 1</p>
              <p className="text-[#666666]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                lacinia, nisl nec condimentum.
              </p>
              <div className="px-4 py-2 bg-[#00CED1] w-fit text-white rounded-full shadow-md flex items-center justify-center gap-1">
                <p className="text-[14px] font-bold">Physics</p>
              </div>{" "}
            </div>
          </div>
          <div className="flex flex-row items-start">
            <FaStar size={25} color="" />
            <Image src={Trash} className="w-7" alt="trash" />

            </div>
        </div>
       


      </div>
    </div>
  );
}
