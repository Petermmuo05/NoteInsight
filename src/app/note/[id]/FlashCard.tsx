"use client";
import React, { useState } from "react";
import {
  MdArrowLeft,
  MdArrowRight,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import ProgressBar from "./ProgressBar";
import { Quiz } from "@/app/_lib/definitions";

export default function FlashCard({ quizList }: { quizList: Quiz[] }) {
  const quizLen = quizList.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerVisible, setAnswerVisible] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizLen - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerVisible(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswerVisible(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <div className="flex flex-row items-center rounded-xl w-full h-fit transition-all duration-200 ease-in-out">
        {/* Left Arrow */}
        <div className="h-full items-center hidden sm:flex transition-all active:scale-98 no-select duration-200 ease-in-out hover:text-like-gray text-black hover:scale-110">
          <MdArrowLeft
            className="text-[30px] sm:text-[35px] md:text-[40px] lg:text-[50px]"
            onClick={handlePrevQuestion}
          />
        </div>

        {/* Main Card Content */}
        <div className="w-full h-full flex flex-col px-4 py-6 sm:p-5 md:p-6 lg:p-8 shadow-lg rounded-xl bg-white">
          {/* Progress Section */}
          <div className="flex flex-row w-full items-center mb-8 sm:mb-5 md:mb-6 lg:mb-8 justify-between">
            <p className="font-bold sm:font-medium text-lg sm:text-sm md:text-base lg:text-[0.95rem]">
              Question {currentQuestionIndex + 1} of {quizLen}
            </p>
            <ProgressBar
              progress={((currentQuestionIndex + 1) / quizLen) * 100}
            />
          </div>

          {/* Question */}
          <p className="font-bold px-3 sm:px-4 md:px-4 lg:px-5 text-[40px] sm:text-xl md:text-2xl lg:text-[1.8rem]">
            {/* In the context of quantum entanglement, how does the violation of
          Bell’s inequalities support the non-local nature of quantum mechanics? */}
            {quizList[currentQuestionIndex].question}
          </p>

          {/* Answer Section with Smooth Expansion */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isAnswerVisible
                ? "mt-10 sm:mt-5 md:mt-6 lg:mt-8 max-h-[200px] sm:max-h-[250px] md:max-h-[280px] lg:max-h-[300px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {isAnswerVisible && (
              <div>
                <div className="flex px-3 sm:px-4 md:px-4 lg:px-5 flex-row items-center hover:text-medium-gray text-[#555] cursor-pointer gap-1">
                  <MdVisibilityOff className="text-[25px] sm:text-[16px] lg:text-[18px]" />
                  <h1
                    onClick={() => setAnswerVisible(false)}
                    className="font-bold text-[25px] sm:text-base md:text-lg lg:text-[1.2rem]"
                  >
                    Answer
                  </h1>
                </div>

                <p className="font-normal px-3 sm:px-4 md:px-4 lg:px-5 text-[25px] sm:text-base md:text-lg lg:text-[1.2rem] text-[#555]">
                  {quizList[currentQuestionIndex].answer}
                </p>
              </div>
            )}
          </div>

          {/* Toggle Button for Viewing the Answer */}
          <div
            className={`w-full flex justify-end items-center py-1 overflow-hidden transition-all duration-500 ease-in-out ${
              !isAnswerVisible
                ? "mt-8 sm:mt-5 md:mt-6 lg:mt-8 max-h-[200px] sm:max-h-[250px] md:max-h-[280px] lg:max-h-[300px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {!isAnswerVisible && (
              <div
                onClick={() => setAnswerVisible(true)}
                className="px-4 sm:px-2.5 md:px-3 mr-0.5 flex items-center flex-row gap-0.5 sm:gap-1 md:gap-1 lg:gap-1 w-fit py-3 sm:py-1.5 md:py-1.5 lg:py-2 text-[20px] sm:text-sm md:text-sm lg:text-[14px] rounded-full text-light-gray transition-all active:scale-98 no-select duration-200 ease-in-out hover:bg-like-gray bg-black hover:scale-105 hover:shadow-lg"
              >
                <MdVisibility
                  className="text-[30px] sm:text-[16px] lg:text-[18px]"
                  color="white"
                />
                <span>Answer</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Arrow */}
        <div className="h-full items-center hidden sm:flex transition-all active:scale-98 no-select duration-200 ease-in-out hover:text-like-gray text-black hover:scale-110">
          <MdArrowRight
            className="text-[30px] sm:text-[35px] md:text-[40px] lg:text-[50px]"
            onClick={handleNextQuestion}
          />
        </div>
      </div>
      <div className="w-full flex sm:hidden justify-between mt-4 px-2">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold border text-black transition-all duration-200 ease-in-out ${
            currentQuestionIndex === 0
              ? "bg-gray-300 text-gray-400 border-gray-300 cursor-not-allowed"
              : " hover:bg-like-gray border-[#d8f999]  active:scale-85"
          }`}
        >
          <MdArrowLeft className="text-lg" />
          Prev
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === quizLen - 1}
          className={`flex items-center gap-1 px-4 py-2 border rounded-full font-semibold text-black transition-all duration-200 ease-in-out ${
            currentQuestionIndex === quizLen - 1
              ? "bg-gray-300 text-gray-400 border-gray-300 cursor-not-allowed"
              : " hover:bg-like-gray border-[#d8f999]  active:scale-85"
          }`}
        >
          Next
          <MdArrowRight className="text-[20px]" />
        </button>
      </div>
    </div>
  );
}
