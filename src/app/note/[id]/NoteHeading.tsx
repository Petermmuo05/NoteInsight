"use client";
import Image from "next/image";
import React from "react";
import NoteStar from "./note_star";
import Trash from "../../../../public/trash.svg";
import File from "../../../../public/file3.svg";
import { useQuiz } from "./QuizContext";
import { MdArrowBack, MdQuiz, MdWest } from "react-icons/md";

export default function NoteHeading() {
  const {
    isQuizOpen,
    openSummary,
  }: { isQuizOpen: boolean; openSummary: () => void } = useQuiz();
  return (
    <div className="flex no-select flex-row justify-between items-center ">
      <div className="flex flex-row items-center">
        {isQuizOpen ? (
          <MdQuiz className="text-[2.7rem] sm:text-[2.8rem] md:text-[3.2rem]  lg:text-[4rem] cursor-pointer" />
        ) : (
          <Image
            src={File}
            className="w-[2.7rem] sm:w-[2.8rem] md:w-[3.2rem]  lg:w-[4rem]"
            alt="file"
          />
        )}

        <h1 className=" font-extrabold text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem]">
          Lecture 1
        </h1>
      </div>
      <div className="flex flex-row items-center">
        {isQuizOpen ? (
          <div
            onClick={openSummary}
            className="flex flex-row items-center text-like-gray hover:text-gray-600"
          >
            <MdArrowBack className="text-[25px] hidden lg:block  " />
            <MdWest className="text-[30px] lg:hidden font-bold" />
            <p className="font-bold hidden lg:inline ">View Summary</p>
          </div>
        ) : (
          <>
            {" "}
            <NoteStar />
            <Image
              src={Trash}
              className=" w-[1.7rem] sm:w-[1.8rem] md:w-[2.1rem] lg:w-[2.5rem]  active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
              alt="trash"
            />
          </>
        )}
      </div>
    </div>
  );
}
