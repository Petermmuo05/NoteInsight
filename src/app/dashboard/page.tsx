import { Open_Sans } from "next/font/google";
import React from "react";
import Image from "next/image";
import File from "../../../public/file3.svg";
import { FaSearch, FaFilter } from "react-icons/fa";
import Star from "./star";
import Header from "../_components/header_bar";
import { ModalProvider } from "./modal_context";
import Fab from "./fab";
import AttachFile from "./attachLarge";
import AttachModal from "./attach_modal";
import { auth } from "../_lib/auth";
import LoadingScreen from "../note/[id]/LoadingScreen";
import { getAllUserNotes } from "../_lib/actions/dashboard/action";
import { NoteData } from "../_lib/definitions";
import Link from "next/link";
import Trash from "./Trash";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default async function Dashboard() {
  const session = await auth();
  const notes: NoteData[] = await getAllUserNotes(session?.accessToken);
  console.log(notes);
  console.log(session);

  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <ModalProvider>
      <div
        className={`flex ${openSans} gap-4 flex-col bg-[#f9f8f6] scrollbar-hide text-[#1b140e] p-4 min-h-screen`}
      >
        <Header session={session} />
        <div className="w-full mt-16 cursor-pointer  flex gap-2 sm:justify-end">
          <div className="relative text-[14px]">
            <input
              type="text"
              placeholder="Search..."
              className="px-8 py-2 sm:w-[200px]  rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#666666]"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch size={15} color="#666666" />
            </div>
            <div className="absolute right-3 top-1/2 cursor-pointer hover:scale-102 active:scale-90 transition-all duration-200 ease-in-out transform -translate-y-1/2 text-gray-400">
              <FaFilter size={15} color="#666666" />
            </div>
          </div>
          <AttachFile session={session} />
          <AttachModal session={session} />
        </div>
        <div className="w-full max-h-full no-select grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 rounded-lg">
          <Fab />
          {notes.map((note) => (
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
      </div>
      <LoadingScreen />
    </ModalProvider>
  );
}
