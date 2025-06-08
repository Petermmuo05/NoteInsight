"use client";
import React, { useState, useRef } from "react";
import { Modal } from "@mui/material";
import { useModal } from "./modal_context";
import { UploadFile } from "../_lib/actions/dashboard/action";
import { Session } from "next-auth";
import { FaFile } from "react-icons/fa";

const AttachModal = ({ session }: { session: Session | null }) => {
  const { isModalOpen, closeModal } = useModal();
  const [uploading, setUploading] = useState(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null); // Changed to a single file
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jwt = session?.accessToken;
  const { startLoading } = useModal();

  // Handle closing the modal with animation
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setFile(null); // Reset the file state
      closeModal();
    }, 300);
  };

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  async function uploadDocument(file: File, promptKey: number) {
    const formData = new FormData();
    handleClose();
    startLoading(true);
    console.log("trying to upload...");
    if (!file) return;
    console.log("still trying to upload", uploading);
    formData.append("file", file);
    try {
      setUploading(true);
      await UploadFile(formData, jwt, promptKey);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  }

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0]; // Only take the first file
    if (validateFileType(droppedFile)) {
      setFile(droppedFile); // Set the single file
    } else {
      alert("Only Word, PDF, or text files are allowed.");
    }
  };

  // Handle file selection via input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Only take the first file
    if (selectedFile && validateFileType(selectedFile)) {
      setFile(selectedFile); // Set the single file
    } else {
      alert("Only Word, PDF, or text files are allowed.");
    }
  };

  // Validate file type
  const validateFileType = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    return allowedTypes.includes(file.type);
  };

  // Trigger file input click when "Select files" button is clicked
  const handleSelectFilesClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          className: "custom-backdrop",
        },
      }}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-[#1C2526] rounded-xl shadow-2xl p-6 text-white ${
          closing ? "modal-closing" : "modal-animate"
        }`}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">
            {file ? "Select summary style ✨" : "Attach"}
          </h2>
          <button onClick={handleClose} className="text-white text-lg">
            ✕
          </button>
        </div>

        {/* Upload Files Section */}
        <div
          className={`flex flex-col items-center p-6 border-2 border-dashed border-[#4A5657] rounded-lg bg-[#2A3435] mb-4 transition-colors ${
            isDragging ? "border-blue-500 bg-blue-500/20" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="w-full flex flex-col gap-3 ">
              {file && (
                <div className="mb-4 ">
                  <div className="flex items-center gap-1 mb-1">
                    <FaFile />
                    <div className="text-base">Selected File:</div>
                  </div>
                  <p className="text-sm text-[#B0BEC5]">{file.name}</p>
                </div>
              )}
              <div className="w-full flex items-center justify-evenly">
                <div
                  onClick={() => uploadDocument(file, 0)}
                  className="px-5 py-2  bg-dark-gray text-light-green rounded-full shadow-md flex items-center justify-center gap-1 
             transition-all active:scale-98 no-select duration-200 ease-in-out hover:bg-like-gray hover:scale-105 hover:shadow-lg"
                >
                  {/* <FaPlus size={15} color="white" /> */}
                  <p className="text-[17px] font-medium">Indepth</p>
                </div>{" "}
                <div
                  onClick={() => uploadDocument(file, 1)}
                  className="px-5 py-2  bg-dark-gray text-light-green rounded-full shadow-md flex items-center justify-center gap-1 
             transition-all active:scale-98 no-select duration-200 ease-in-out hover:bg-like-gray hover:scale-105 hover:shadow-lg"
                >
                  {/* <FaPlus size={15} color="white" /> */}
                  <p className="text-[17px] font-medium">Concise</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {" "}
              <div className="w-12 h-12 rounded-full bg-[#4A5657] flex justify-center items-center mb-3">
                <span className="text-2xl">📷</span>
              </div>
              <p className="text-base mb-2">Upload files</p>
              <p className="text-sm text-[#B0BEC5] mb-4">
                Drag and drop to upload
              </p>
              <button
                onClick={handleSelectFilesClick}
                className="border border-white text-white px-4 py-1.5 rounded-lg hover:bg-white hover:text-[#1C2526] transition"
              >
                Select file
              </button>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* Display selected file */}
      </div>
    </Modal>
  );
};

export default AttachModal;
