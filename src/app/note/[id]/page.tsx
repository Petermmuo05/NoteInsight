import Header from "@/app/_components/header_bar";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import File from "../../../../public/file3.svg";
import React from "react";
import Trash from "../../../../public/trash.svg";
import FrostedGlassBox from "./glass_card";
import { MdQuiz, MdSummarize } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import NoteStar from "./note_star";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default function Note() {
  return (
    <div
      className={`flex ${openSans} gap-4 flex-col scrollbar-hide bg-[#f9f8f6] text-[#1b140e] p-4 h-screen`}
    >
      <Header />
      <div className="flex flex-col gap-3 sm:gap-4 mt-16 sm:mt-24 w-full px-1 sm:px-[5rem] md:px-[8rem] lg:px-48 text-like-gray h-full">
        <div className="flex no-select flex-row justify-between items-center ">
          <div className="flex flex-row items-center">
            <Image
              src={File}
              className="w-[2.7rem] sm:w-[2.8rem] md:w-[3.2rem]  lg:w-[4rem]"
              alt="file"
            />
            <h1 className=" font-extrabold text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem]">
              Lecture 1
            </h1>
          </div>
          <div className="flex flex-row items-center">
            <NoteStar />
            <Image
              src={Trash}
              className=" w-[1.7rem] sm:w-[1.8rem] md:w-[2.1rem] lg:w-[2.5rem]  active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
              alt="trash"
            />
          </div>
        </div>
        <div className="flex flex-row mt-2 sm:mt-5 w-full h-full">
          
          <div className="flex flex-col ml-2 sm:ml-20 w-full h-full gap-5 sm:gap-8 ">
            <div className="flex flex-row items-center gap-3">
              <FrostedGlassBox />
              <div className="hidden sm:flex justify-center gap-1 items-center">
                <Tooltip title="Summary" arrow>
                  <MdSummarize
                    size={35}
                    className="active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
                  />
                </Tooltip>
                <Tooltip title="Quiz" arrow>
                  <MdQuiz
                    size={35}
                    className="active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
                  />
                </Tooltip>
              </div>
            </div>
            <div className="">
              <h1 className="text-[1.4rem] sm:text-[1.5rem] md:text-[1.7rem] lg:text-[2rem]  font-bold">
                Summary
              </h1>
              <p className="text-lg mt-2 sm:mt-4   text-[14px] sm:text-[13px] md:text-[14px] lg:text-[16px]  font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
                ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
