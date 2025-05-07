// ModalContext.tsx
"use client";
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, JSX } from 'react';

interface ModalContextValue {
  isModalOpen: boolean;
  openModal: (content?: unknown | null) => void;
  closeModal: () => void;
  modalContent: unknown | null;
  setModalContent: Dispatch<SetStateAction<unknown | null>>;
}


const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// Define the props for the ModalProvider component
interface ModalProviderProps {
  children: ReactNode; 
}

// Implement the Provider component
export const FormModalProvider = ({ children }: ModalProviderProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<unknown | null>(null);

  // Add type annotations to function parameters and return types
  const openModal = (content: unknown | null = null): void => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent, setModalContent }}>
      {children}
    </ModalContext.Provider>
  );
};

// Create a custom hook to use the modal context
export const useFormModal = (): ModalContextValue => {
  const context = useContext(ModalContext);

  // Throw an error if the hook is used outside the provider
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};