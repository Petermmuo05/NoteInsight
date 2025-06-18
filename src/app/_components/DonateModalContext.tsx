"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

type DonateModalContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const DonateModalContext = createContext<DonateModalContextType | undefined>(
  undefined
);

export const useDonateModal = () => {
  const context = useContext(DonateModalContext);
  if (!context) {
    throw new Error("useDonateModal must be used within a DonateModalProvider");
  }
  return context;
};

export const DonateModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <DonateModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </DonateModalContext.Provider>
  );
};
