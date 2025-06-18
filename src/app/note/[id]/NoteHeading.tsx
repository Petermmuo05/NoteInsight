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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";

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
  const [open, setOpen] = React.useState(false);

  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function handleDeleteNote(): Promise<void> {
    // Only delete if modal is confirmed
    startLoading();
    await deleteNoteById(note.id, token);
    router.push("/dashboard");
    stopLoading();
    toast.success("Note successfully deleted");
    setOpen(false);
    console.log(`Note with ID ${note.id} has been deleted.`);
  }

  return (
    <>
      <div className="flex no-select flex-row justify-between items-center ">
        <div className="flex flex-row items-center">
          {isQuizOpen ? (
            <MdQuiz className="text-[2.7rem] sm:text-[2.8rem] md:text-[3.2rem]  lg:text-[4rem] cursor-pointer mr-1" />
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
            <>
              <NoteOptions
                note={note}
                token={token}
                handleEdit={openModal}
                handleDelete={() => setOpen(true)}
              />
            </>
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#f9f8f6",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            minWidth: 300,
            outline: "none",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography
            id="delete-modal-title"
            sx={{
              fontWeight: 600,
              fontSize: "1.25rem",
              color: "#333",
            }}
          >
            Delete Note
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={handleDeleteNote}
            sx={{
              backgroundColor: "red",
              color: "white",
              textTransform: "none",
              borderRadius: "50px",
              py: 1.5,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              userSelect: "none",
              boxShadow: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "darkred",
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px 0 rgba(0,0,0,0.10)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            Delete
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: "#e0e0e0",
              color: "#333",
              textTransform: "none",
              borderRadius: "50px",
              py: 1.5,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              userSelect: "none",
              boxShadow: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#d0d0d0",
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px 0 rgba(0,0,0,0.10)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
