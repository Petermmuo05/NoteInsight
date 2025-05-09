"use client";
import Image from "next/image";
import React from "react";
import Fab from "./fab";
import { NoteData } from "../_lib/definitions";
import Link from "next/link";
import Star from "./star";
import Trash from "./Trash";
import File from "../../../public/file3.svg";

import { Session } from "next-auth";
import { useModal } from "./modal_context";

export default function NoteList({
  notes,
  session,
}: {
  notes: NoteData[];
  session: Session | null;
}) {
  const { selectedTag, titleFilter, isOnlyFavorites } = useModal();
  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  console.log(selectedTag, titleFilter, isOnlyFavorites);
  return (
    <div className="w-full max-h-full no-select grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 rounded-lg">
      <Fab />
      {notes
        .filter((note) => {
          let res = true;
          if (!(selectedTag == undefined || note.tag.id == selectedTag))
            res = false;
          console.log(titleFilter, isOnlyFavorites, note.title);
          if (
            !(
              titleFilter == "" ||
              note.title?.toLowerCase().startsWith(titleFilter.toLowerCase())
            )
          )
            res = false;
          if (!(isOnlyFavorites == undefined || note.isFavorite == isOnlyFavorites))
            res = false;
          return res;
        })
        .map((note) => (
          <div
            key={note.id}
            className="flex flex-row transition-all duration-200 ease-in-out hover:scale-102 active:scale-100 justify-between items-start bg-white rounded-lg shadow-md h-[180px] sm:h-[200px] p-2 py-4 sm:p-4"
          >
            <Image src={File} className="w-10" alt="file" />
            <Link
              href={`/note/${note.id}`}
              className="basis-[70%] flex flex-col hover:opacity-85 transition-all duration-200  h-full gap-2 items-start justify-between"
            >
              <div className="w-full flex flex-col gap-3">
                <p className="text-2xl font-[800] text-[#1C2526]">
                  {note.title
                    ? capitalizeFirstLetter(note.title)
                    : `Lecture ${note.id}`}{" "}
                </p>
                <p className="text-[#666666] text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]">
                  {note.preview}...
                </p>
              </div>
              <div className="px-4 py-2 bg-[#999999] w-fit text-white rounded-full shadow-md flex items-center justify-center gap-1">
                <p className="sm:text-[14px] text-[13px] font-bold">
                  {note.tag.name}
                </p>
              </div>{" "}
            </Link>
            <div className="flex flex-row items-start">
              <Star token={session?.accessToken} note={note} />
              <Trash note={note} token={session?.accessToken} />
            </div>
          </div>
        ))}
    </div>
  );
}
