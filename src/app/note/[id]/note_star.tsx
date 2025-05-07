"use client";
import { updateFavorite } from "@/app/_lib/actions/dashboard/action";
import { NoteData } from "@/app/_lib/definitions";
import { useModal } from "@/app/dashboard/modal_context";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

export default function NoteStar({
  note,
  token,
}: {
  note: NoteData;
  token: string | undefined;
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
      toast.success('Note updated successfully!');
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      stopLoading();
    }

    console.log(`Note with ID ${note.id} has been updated.`);
  }
  return (
    <FaStar
      className={`cursor-pointer active:scale-90 hover:scale-102 text-[1.7rem] sm:text-[1.8rem] md:text-[2.1rem] lg:text-[2.5rem] transition-all duration-200 ease-in-out ${
        active ? "text-[#1C2526]" : "text-white stroke-[#1C2526] stroke-[15] "
      }`}
      onClick={(e) => {
        handleUpdateNote(e);
        e.preventDefault();
        e.stopPropagation();
      }}
    />
  );
}
