// components/GlassCard.jsx
import { NoteData } from "@/app/_lib/definitions";
import React, { useState } from "react";
import { FaFile } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function FrostedGlassBox({
  note,
  handleClick,
}: {
  note: NoteData;
  handleClick?: (format: "pdf" | "word") => void;
}) {
  const [open, setOpen] = useState(false);

  // Dummy export function, replace with your actual export logic
  const exportHtml = async (format: "pdf" | "word") => {
    handleClick?.(format);
    // You can call your export logic here, e.g., exportHtml(note.summary.summaryText, format)
    setOpen(false);
  };

  return (
    <>
      <div
        className="
          relative 
          flex
          no-select
          flex-row
          bg-opacity-30 
          backdrop-blur-lg 
          border border-white border-opacity-20 
          rounded-xl 
          shadow-xl 
          items-center
          inset-0
          bg-white/70
          lg:w-[400px]
          md:w-[280px]
          w-[280px]
          p-2
          sm:p-3 
          gap-2
          transition-all duration-300 ease-in-out 
          hover:scale-105 
          hover:shadow-2xl 
          active:scale-95
        "
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center bg-light-gray p-3 rounded-lg justify-center">
          <FaFile className="text-[15px] sm:text-[20px]" />
        </div>
        <div className="w-full flex flex-col justify-center h-full gap-1">
          <p className="leading-[100%] text-[14px] sm:text-[16px] font-bold">
            {note.fileName.slice(0, 26)}
            {note.fileName.length > 26 && "..."}
          </p>
          <p className="text-[12px] sm:text-sm leading-[100%]">Document</p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="export-modal-title"
        aria-describedby="export-modal-description"
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
            id="export-modal-title"
            sx={{
              fontWeight: 600,
              fontSize: "1.25rem",
              color: "#333",
            }}
          >
            Export as
          </Typography>
          <Button
            onClick={() => exportHtml("pdf")}
            fullWidth
            sx={{
              backgroundColor: "#d8f999",
              color: "#000",
              textTransform: "none",
              borderRadius: "50px",
              py: 1.5,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              userSelect: "none",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#e6f7b8", // like-gray, adjust as needed
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px 0 rgba(0,0,0,0.10)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            PDF
          </Button>
          <Button
            onClick={() => exportHtml("word")}
            fullWidth
            sx={{
              backgroundColor: "#e0e0e0",
              color: "#333",
              textTransform: "none",
              borderRadius: "50px",
              py: 1.5,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              userSelect: "none",
              boxShadow: "none",
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
            Word
          </Button>
        </Box>
      </Modal>
    </>
  );
}
