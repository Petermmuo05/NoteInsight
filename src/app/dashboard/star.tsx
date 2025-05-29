"use client";
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { updateFavorite } from "../_lib/actions/dashboard/action";
import { NoteData } from "../_lib/definitions";
import { useModal } from "./modal_context";
import toast from "react-hot-toast";

export default function Star({
  size = "1.6rem",
  token,
  note,
}: {
  size?: string;
  token: string | undefined;
  note: NoteData;
}) {
  const [active, setActive] = React.useState(false);
  const { startLoading, stopLoading } = useModal();

  useEffect(() => {
    setActive(note.isFavorite);
  }, [note.isFavorite]);

  async function handleUpdateNote(
    event: React.MouseEvent<SVGElement, MouseEvent>
  ): Promise<void> {
    event.stopPropagation();
    // Logic to delete the note, e.g., calling an API or updating state
    startLoading();
    try {
      await updateFavorite(note.id, token, !active);
      setActive((s) => !s);
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      stopLoading();
    }

    console.log(`Note with ID ${note.id} has been updated.`);
  }

  return (
    <FaStar
      size={size}
      className={`cursor-pointer active:scale-90 hover:scale-102 ${`w-${size}`} transition-all duration-200 ease-in-out ${
        active ? "text-[#d8f999]" : "text-white stroke-[#d8f999] stroke-[15] "
      }`}
      onClick={(e) => {
        handleUpdateNote(e);
        e.preventDefault();
        e.stopPropagation();
      }}
    />
  );
}
