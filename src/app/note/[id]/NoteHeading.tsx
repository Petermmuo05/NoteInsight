"use client";
import Image from "next/image";
import React from "react";
import File from "../../../../public/file3.svg";
import { useQuiz } from "./QuizContext";
import { MdArrowBack, MdQuiz, MdWest } from "react-icons/md";
import { NoteData } from "@/app/_lib/definitions";
import { deleteNoteById } from "@/app/_lib/actions/dashboard/action";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/dashboard/modal_context";
import { useFormModal } from "./ModalContext";
import NoteOptions from "@/app/_components/NoteOptions";

export default function NoteHeading({
  note,
  token,
}: {
  note: NoteData;
  token: string | undefined;
}) {
  const {
    isQuizOpen,
    openSummary,
  }: { isQuizOpen: boolean; openSummary: () => void } = useQuiz();
  const router = useRouter();
  const { startLoading, stopLoading } = useModal();
  const { openModal } = useFormModal();

  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function handleDeleteNote(): Promise<void> {
    // event: React.MouseEvent<HTMLImageElement, MouseEvent>
    // event.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      // Logic to delete the note, e.g., calling an API or updating state
      startLoading();
      await deleteNoteById(note.id, token);
      router.push("/dashboard");
      stopLoading();
      console.log(`Note with ID ${note.id} has been deleted.`);
    }
  }

  return (
    <div className="flex no-select flex-row justify-between items-center ">
      <div className="flex flex-row items-center">
        {isQuizOpen ? (
          <MdQuiz className="text-[2.7rem] sm:text-[2.8rem] md:text-[3.2rem]  lg:text-[4rem] cursor-pointer" />
        ) : (
          <Image
            src={File}
            className="w-[2.7rem] sm:w-[2.8rem] md:w-[3.2rem]  lg:w-[4rem]"
            alt="file"
          />
        )}{" "}
        <h1 className=" font-extrabold text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem]">
          {note.title
            ? capitalizeFirstLetter(note.title)
            : `Lecture ${note.id}`}
        </h1>
      </div>
      <div className="flex flex-row items-center">
        {isQuizOpen ? (
          <div
            onClick={openSummary}
            className="flex flex-row items-center text-like-gray hover:text-gray-600"
          >
            <MdArrowBack className="text-[25px] hidden lg:block  " />
            <MdWest className="text-[30px] lg:hidden font-bold" />
            <p className="font-bold hidden lg:inline ">View Summary</p>
          </div>
        ) : (
          // <>

          //   <MdEdit
          //     onClick={openModal}
          //     className="text-[1.5rem] sm:text-[1.8rem] md:text-[2.1rem] lg:text-[2.5rem] cursor-pointer active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out"
          //   />

          //   <NoteStar note={note} token={token} />
          //   <Image
          //     src={Trash}
          //     className=" w-[1.7rem] sm:w-[1.8rem] md:w-[2.1rem] lg:w-[2.5rem]  active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
          //     alt="trash"
          //     onClick={handleDeleteNote}
          //   />
          // </>
          <>
            <NoteOptions
              note={note}
              token={token}
              handleEdit={openModal}
              handleDelete={handleDeleteNote}
            />
            {/* <MdEdit
              onClick={() => {

              }}
              className="text-[1.5rem] sm:text-[1.8rem] md:text-[2.1rem] lg:text-[2.5rem] cursor-pointer active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out"
            /> */}
          </>
        )}
      </div>
    </div>
  );
}
