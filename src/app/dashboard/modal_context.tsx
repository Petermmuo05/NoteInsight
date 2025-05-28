"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context shape
interface ModalContextType {
  isModalOpen: boolean;
  isUploading: boolean;
  isOnlyFavorites: boolean;
  isCreatingNote: boolean;
  selectedTag: number | undefined;
  setSelectedTag: React.Dispatch<React.SetStateAction<number | undefined>>;
  titleFilter: string;
  setTitleFilter: React.Dispatch<React.SetStateAction<string>>;
  setIsOnlyFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  closeFilter: () => void;
  onlyFavorites: () => void;
  notOnlyFavorites: () => void;
  startLoading: (isNote?: boolean) => void;
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
  const [isCreatingNote, setCreatingNote] = useState<boolean>(false);

  const [isOnlyFavorites, setIsOnlyFavorites] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<number | undefined>(undefined);
  const [titleFilter, setTitleFilter] = useState<string>("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const startLoading = (isNote: boolean = false) => {
    setUploading(true);
    setCreatingNote(isNote);
  };
  const stopLoading = () => {
    setUploading(false);
    setCreatingNote(false);
  };
  const onlyFavorites = () => setIsOnlyFavorites(true);
  const notOnlyFavorites = () => setIsOnlyFavorites(false);
  const closeFilter = () => {
    setIsOnlyFavorites(false);
    setSelectedTag(undefined);
    setTitleFilter("");
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        startLoading,
        stopLoading,
        isUploading,
        isCreatingNote,
        isOnlyFavorites,
        selectedTag,
        setSelectedTag,
        onlyFavorites,
        notOnlyFavorites,
        closeFilter,
        titleFilter,
        setTitleFilter,
        setIsOnlyFavorites,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
