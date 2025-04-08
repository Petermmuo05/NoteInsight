"use client";
import React from "react";
import FrostedGlassBox from "./glass_card";
import { MdQuiz} from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import FlashCard from "./FlashCard";
import { useQuiz } from "./QuizContext";

export default function NoteContent() {
  const {
    isQuizOpen,
    openQuiz,
  }: { isQuizOpen: boolean; openQuiz: () => void } = useQuiz();
  return isQuizOpen ? (
    <div className="flex mt-2 sm:mt-5 w-full h-full">
      <FlashCard />
    </div>
  ) : (
    <div className="flex flex-col mt-2 pl-2 sm:pl-20 sm:mt-5 w-full h-full">
      <div className="flex flex-col  w-full h-full gap-5 sm:gap-8 ">
        <div className="flex flex-row items-center gap-3">
          <FrostedGlassBox />
          <div className="flex justify-center gap-1 items-center">

            <Tooltip title="Quiz" arrow>
              <MdQuiz
                onClick={openQuiz}
                size={35}
                className="active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
              />
            </Tooltip>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-[1.4rem] sm:text-[1.5rem] md:text-[1.7rem] lg:text-[2rem]  font-bold">
            Summary
          </h1>
          <p className="text-lg mt-2 sm:mt-4 text-[14px] sm:text-[13px] md:text-[14px] lg:text-[16px]  font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta.
          </p>
        </div>
      </div>
    </div>
  );
}
