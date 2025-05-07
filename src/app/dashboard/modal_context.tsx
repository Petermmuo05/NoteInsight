"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context shape
interface ModalContextType {
  isModalOpen: boolean;
  isUploading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  openModal: () => void;
  closeModal: () => void;
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Hook to use the modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// Modal provider component
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUploading, setUploading] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const startLoading = () => setUploading(true);
  const stopLoading = () => setUploading(false);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        startLoading,
        stopLoading,
        isUploading,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
