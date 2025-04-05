"use client";
import React, { useState, useRef } from "react";
import { Modal } from "@mui/material";
import { useModal } from "./modal_context";

const AttachModal: React.FC = () => {
  const { isModalOpen, closeModal } = useModal();
  const [closing, setClosing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);



  // Add/remove class and padding to body to prevent layout shift


  // Handle closing the modal with animation
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setFiles([]);
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

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  // Handle file selection via input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
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
          <h2 className="text-xl font-medium">Attach</h2>
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
          <div className="w-12 h-12 rounded-full bg-[#4A5657] flex justify-center items-center mb-3">
            <span className="text-2xl">📷</span>
          </div>
          <p className="text-base mb-2">Upload files</p>
          <p className="text-sm text-[#B0BEC5] mb-4">Drag and drop to upload</p>
          <button
            onClick={handleSelectFilesClick}
            className="border border-white text-white px-4 py-1.5 rounded-lg hover:bg-white hover:text-[#1C2526] transition"
          >
            Select files
          </button>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />
        </div>

        {/* Display selected files */}
        {files.length > 0 && (
          <div className="mb-4">
            <p className="text-base mb-2">Selected Files:</p>
            <ul className="list-disc list-inside text-sm text-[#B0BEC5]">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Attach URL Section */}
      </div>
    </Modal>
  );
};

export default AttachModal;
