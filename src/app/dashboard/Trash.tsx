"use client";
import React, { useState } from "react";
import { useModal } from "./modal_context";
import { deleteNoteById } from "../_lib/actions/dashboard/action";
import Image from "next/image";
import TrashImg from "../../../public/trash.svg";
import { NoteData } from "../_lib/definitions";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Trash({
  note,
  token,
}: {
  note: NoteData;
  token: string | undefined;
}) {
  const { startLoading, stopLoading } = useModal();
  const [open, setOpen] = useState(false);

  async function handleDeleteNote(): Promise<void> {
    startLoading();
    await deleteNoteById(note.id, token);
    stopLoading();
    setOpen(false);
    console.log(`Note with ID ${note.id} has been deleted.`);
  }

  return (
    <>
      <Image
        src={TrashImg}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="w-7 active:scale-90 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer"
        alt="trash"
      />
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
