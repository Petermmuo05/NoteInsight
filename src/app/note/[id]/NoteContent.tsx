"use client";
import React, { useState, useEffect } from "react"; // Import useEffect
import FrostedGlassBox from "./glass_card";
import { MdQuiz } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import FlashCard from "./FlashCard";
import { useQuiz } from "./QuizContext";
import { NoteData } from "@/app/_lib/definitions";
import DOMPurify from "dompurify"; // For sanitizing HTML

// Import NoteSummary is commented out, so ignoring for now

export default function NoteContent({ note }: { note: NoteData }) {
  const {
    isQuizOpen,
    openQuiz,
  }: { isQuizOpen: boolean; openQuiz: () => void } = useQuiz();

  // 1. Add state to hold the sanitized HTML
  const [sanitizedSummaryHtml, setSanitizedSummaryHtml] = useState("");

  // 2. Use useEffect to perform sanitization on the client side
  useEffect(() => {
    // Check if note data and summary text exists, and if we are in the browser environment
    // typeof window !== 'undefined' is a common check for browser environments
    if (
      note?.summary?.summaryText &&
      typeof window !== "undefined" &&
      DOMPurify
    ) {
      try {
        // Sanitize the HTML and update the state
        const cleanHtml = DOMPurify.sanitize(note.summary.summaryText);
        setSanitizedSummaryHtml(cleanHtml);
      } catch (error) {
        console.error("Error sanitizing summary HTML:", error);
        // Optionally set an error state or display a fallback message
        setSanitizedSummaryHtml(
          `<p style="color: red;">Could not display summary.</p>`
        );
      }
    } else {
      // Clear sanitized HTML if note data is not available or incomplete
      setSanitizedSummaryHtml("");
    }
    // The effect depends on the 'note' object, so it re-runs if the note data changes
  }, [note]);

  // The rest of your component logic remains the same,
  // but the dangerouslySetInnerHTML now uses the state variable.
  return isQuizOpen ? (
    <div className="flex mt-2 sm:mt-5 w-full h-full">
      {/* Assuming note.quiz maps correctly to the quizList prop expected by FlashCard */}
      <FlashCard quizList={note.quiz} />
    </div>
  ) : (
    <div className="flex flex-col mt-2 pl-2 sm:pl-20 sm:mt-5 w-full h-full">
      <div className="flex flex-col  w-full h-full gap-12 sm:gap-8 ">
        <div className="flex flex-row items-center gap-3">
          {/* Assuming FrostedGlassBox uses note prop */}
          <FrostedGlassBox note={note} />
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
          <h1 className="text-[1.5rem] sm:text-[1.5rem] md:text-[1.7rem] lg:text-[2rem]  font-extrabold">
            Summary
          </h1>
          <div className="summary text-lg mt-5 sm:mt-4 text-[14px] sm:text-[13px] md:text-[14px] lg:text-[16px]  font-normal">
            {/* 3. Use the state variable here */}
            {/* Add a check to ensure sanitizedSummaryHtml is not empty before rendering */}
            {sanitizedSummaryHtml ? (
              <div dangerouslySetInnerHTML={{ __html: sanitizedSummaryHtml }} />
            ) : (
              // Optional: Display a loading message or placeholder if summary is not yet processed
              <p>Loading summary...</p> // Or handle error display if needed
            )}
          </div>
          {/* <NoteSummary session={session} /> */}
        </div>
      </div>
    </div>
  );
}
