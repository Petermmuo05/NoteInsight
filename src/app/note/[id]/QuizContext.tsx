"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context shape
interface QuizContextType {
  isQuizOpen: boolean;
  openQuiz: () => void;
  openSummary: () => void;
}

// Create the context
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Hook to use the modal context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

// Modal provider component
interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  const openQuiz = () => setIsQuizOpen(true);
  const openSummary = () => setIsQuizOpen(false);

  return (
    <QuizContext.Provider value={{ isQuizOpen, openQuiz, openSummary }}>
      {children}
    </QuizContext.Provider>
  );
};
