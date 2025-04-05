import { Open_Sans } from "next/font/google";
import React from "react";
import Image from "next/image";
import Trash from "../../../public/trash.svg";
import File from "../../../public/file3.svg";
import { FaStar, FaSearch, FaFilter } from "react-icons/fa";
import Star from "./star";
import Header from "../_components/header_bar";
import { ModalProvider } from "./modal_context";
import Fab from "./fab";
import AttachFile from "./attachLarge";
import AttachModal from "./attach_modal";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default function Dashboard() {
  return (
    <ModalProvider>
      <div
        className={`flex ${openSans} gap-4 flex-col bg-[#f9f8f6] scrollbar-hide text-[#1b140e] p-4 min-h-screen`}
      >
        <Header />
        <div className="w-full mt-16 cursor-pointer  flex gap-2 sm:justify-end">
          <div className="relative text-[14px]">
            <input
              type="text"
              placeholder="Search..."
              className="px-8 py-2 sm:w-[200px]  rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#666666]"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch size={15} color="#666666" />
            </div>
            <div className="absolute right-3 top-1/2 cursor-pointer hover:scale-102 active:scale-90 transition-all duration-200 ease-in-out transform -translate-y-1/2 text-gray-400">
              <FaFilter size={15} color="#666666" />
            </div>
          </div>
          <AttachFile />
          <AttachModal />
        </div>
        <div className="w-full max-h-full no-select grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 rounded-lg">
          <Fab />

          <div className="flex flex-row transition-all duration-200 ease-in-out hover:scale-102 active:scale-100 justify-between items-start bg-white rounded-lg shadow-md h-[180px] sm:h-[200px] p-2 py-4 sm:p-4">
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
              <Star />
              <Image
                src={Trash}
                className="w-7 active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
                alt="trash"
              />
            </div>
          </div>

          <div className="flex flex-row transition-all duration-200 ease-in-out hover:scale-102 active:scale-100 justify-between items-start bg-white rounded-lg shadow-md h-[180px] sm:h-[200px] p-2 py-4 sm:p-4">
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
              <Star />
              <Image
                src={Trash}
                className="w-7 active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
                alt="trash"
              />
            </div>
          </div>

          <div className="flex flex-row transition-all duration-200 ease-in-out hover:scale-102 active:scale-100 justify-between items-start bg-white rounded-lg shadow-md h-[180px] sm:h-[200px] p-2 py-4 sm:p-4">
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
              <Star />
              <Image
                src={Trash}
                className="w-7 active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
                alt="trash"
              />
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
    </ModalProvider>
  );
}
