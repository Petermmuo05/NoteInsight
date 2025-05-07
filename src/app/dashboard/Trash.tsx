"use client";
import React from "react";
import { useModal } from "./modal_context";
import { deleteNoteById } from "../_lib/actions/dashboard/action";
import Image from "next/image";
import TrashImg from "../../../public/trash.svg";
import { NoteData } from "../_lib/definitions";

export default function Trash({
  note,
  token,
}: {
  note: NoteData;
  token: string | undefined;
}) {
  const { startLoading, stopLoading } = useModal();

  async function handleDeleteNote(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ): Promise<void> {
    event.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      // Logic to delete the note, e.g., calling an API or updating state
      startLoading();
      await deleteNoteById(note.id, token);
      stopLoading();
      console.log(`Note with ID ${note.id} has been deleted.`);
    }
  }
  return (
    <Image
      src={TrashImg}
      onClick={handleDeleteNote}
      className="w-7 active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
      alt="trash"
    />
  );
}
