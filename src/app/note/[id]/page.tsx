import Header from "@/app/_components/header_bar";
import { Open_Sans } from "next/font/google";

import React from "react";

import { QuizProvider } from "./QuizContext";
import NoteContent from "./NoteContent";
import NoteHeading from "./NoteHeading";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default function Note() {
  return (
    <QuizProvider>
      <div
        className={`flex ${openSans} gap-4 flex-col scrollbar-hide bg-[#f9f8f6] text-[#1b140e] p-4 min-h-screen`}
      >
        <Header />
        <div className="flex flex-col gap-[20px] sm:gap-4 mt-16 sm:mt-24 w-full  sm:px-[5rem] md:px-[8rem] lg:px-48 text-like-gray h-full">
          <NoteHeading />
          <NoteContent />
        </div>
      </div>
    </QuizProvider>
  );
}
