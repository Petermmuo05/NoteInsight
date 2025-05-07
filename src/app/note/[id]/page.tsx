import Header from "@/app/_components/header_bar";
import { Open_Sans } from "next/font/google";

import React from "react";

import { QuizProvider } from "./QuizContext";
import NoteContent from "./NoteContent";
import NoteHeading from "./NoteHeading";
import { auth } from "@/app/_lib/auth";
import LoadingScreen from "./LoadingScreen";
import { getAllTags, getNoteById } from "@/app/_lib/actions/dashboard/action";
import { NoteData } from "@/app/_lib/definitions";
import { ModalProvider } from "@/app/dashboard/modal_context";
import { FormModalProvider } from "./ModalContext";
import FormModal from "./EditNoteModal";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default async function Note({ params }: { params: { id: string } }) {
  const { id } = await params;
  const session = await auth();
  const tags = await getAllTags(session?.accessToken);
  const noteData: NoteData = await getNoteById(
    Number(id),
    session?.accessToken as string
  );

  return (
    <QuizProvider>
      <ModalProvider>
        <FormModalProvider>
          <div
            className={`flex ${openSans} gap-4 flex-col scrollbar-hide bg-[#f9f8f6] text-[#1b140e] p-4 min-h-screen`}
          >
            <Header session={session} />
            <div className="flex flex-col gap-[20px] sm:gap-4 mt-16 sm:mt-24 w-full  sm:px-[5rem] md:px-[8rem] lg:px-48 text-like-gray h-full">
              <NoteHeading note={noteData} token={session?.accessToken} />
              <NoteContent note={noteData} />
            </div>
          </div>
          <LoadingScreen />
          <FormModal
            token={session?.accessToken}
            noteId={Number(id)}
            tags={tags}
            noteTag={noteData.tag}
            noteTitle={noteData.title}
          />
        </FormModalProvider>
      </ModalProvider>
    </QuizProvider>
  );
}
