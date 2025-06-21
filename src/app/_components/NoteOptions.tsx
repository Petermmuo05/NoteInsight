"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical } from "lucide-react";
import NoteStar from "../note/[id]/note_star";
import { NoteData } from "../_lib/definitions";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useDonateModal } from "./DonateModalContext";
import createPrompt from "./createPrompt";

export default function NoteOptions({
  note,
  token,
  handleEdit,
  handleDelete,
}: {
  note: NoteData;
  token: string | undefined;
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTrigger, setShowTrigger] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const { openModal } = useDonateModal();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        // Start closing animation, but don't immediately show trigger
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Toggle handler for the three-dots button
  const toggleMenu = () => {
    if (isOpen) {
      // closing: kick off exit animation
      setIsOpen(false);
    } else {
      // opening: hide trigger immediately
      setShowTrigger(false);
      setIsOpen(true);
    }
  };

  return (
    <div ref={containerRef} className="relative flex">
      {/* Three-dot trigger: only rendered when showTrigger is true */}
      {showTrigger && (
        <motion.button
          onClick={toggleMenu}
          className="p-2 rounded-full hover:bg-gray-200 active:scale-90 transition"
          whileTap={{ scale: 0.9 }}
        >
          <MoreVertical size={24} />
        </motion.button>
      )}

      {/* Animated Menu */}
      <AnimatePresence
        // when the children exit, show the trigger again
        onExitComplete={() => {
          setShowTrigger(true);
        }}
      >
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center bg-white shadow-lg rounded-full overflow-hidden origin-right z-10 gap-1 p-2"
          >
            <motion.button
              onClick={() => {
                handleEdit();
                setIsOpen(false);
                createPrompt(session?.user.noPromptTill, openModal);
              }}
              className="sm:p-1 transition-all duration-200 ease-in-out cursor-pointer active:scale-90 hover:scale-102"
              //   whileHover={{ scale: 1.1 }}
              //   whileTap={{ scale: 0.9 }}
            >
              <MdEdit className="text-[2rem] sm:text-[2.2rem] md:text-[2.4rem] lg:text-[2.6rem]" />
            </motion.button>

            <motion.button
              onClick={() => {
                /* NoteStar toggles internally */
              }}
              className="sm:p-1 transition-all duration-200 ease-in-out cursor-pointer active:scale-90 hover:scale-102"
              //   whileHover={{ scale: 1.1 }}
              //   whileTap={{ scale: 0.9 }}
            >
              <NoteStar note={note} token={token} />
            </motion.button>

            <motion.button
              onClick={async () => {
                await handleDelete();
                setIsOpen(false);
              }}
              className="sm:p-1 transition-all duration-200 ease-in-out cursor-pointer active:scale-90 hover:scale-102 "
              //   whileHover={{ scale: 1.1 }}
              //   whileTap={{ scale: 0.9 }}
            >
              <MdDelete className="text-[2rem] sm:text-[2.2rem] md:text-[2.4rem] lg:text-[2.6rem]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
