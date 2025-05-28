// FormModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import {
  Modal,
  Box, // For the modal content container
  Typography, // For text elements like headers
  TextField, // For the title input
  FormControl, // Wrapper for Select + Label
  InputLabel, // Label for the select
  Select, // The select dropdown
  MenuItem, // Options within the select
  Button, // For the submit button
  IconButton, // For the close button
} from "@mui/material";
import { useFormModal } from "./ModalContext"; // Assuming this is the correct context for FormModal
import { UpdateNoteTitle } from "@/app/_lib/actions/dashboard/action";
import { Tag } from "@/app/_lib/definitions";
import { useModal } from "@/app/dashboard/modal_context"; // This context is also imported, ensure it's distinct or used correctly
import toast from "react-hot-toast";

const FormModal = ({
  token,
  noteId,
  noteTitle,
  noteTag,
  tags,
}: {
  token: string | undefined;
  noteId: number;
  noteTitle: string | null;
  noteTag: Tag;
  tags: Tag[];
}) => {
  const { isModalOpen, closeModal } = useFormModal(); // Original closeModal from context
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<number | null>(null);
  const { startLoading, stopLoading } = useModal(); // Assuming this is a general loading context

  // State for modal closing animation
  const [closing, setClosing] = useState<boolean>(false);

  // Handle closing the modal with animation
  const handleAnimatedClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      closeModal(); // Call the original closeModal from useFormModal context
    }, 300); // Duration of the closing animation (e.g., 300ms)
  };

  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (category === null) {
      // Potentially show an error toast or message
      toast.error("Please select a category.");
      return;
    }

    startLoading();

    try {
      await UpdateNoteTitle(noteId, { title, id: category }, token);
      console.log("Form submitted:", { title, id: category });
      handleAnimatedClose(); // Use animated close on successful submit
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      // Reset fields when modal opens based on props
      if (noteTag) {
        setCategory(noteTag.id);
      } else {
        setCategory(null);
      }
      if (noteTitle) {
        setTitle(noteTitle);
      } else {
        setTitle("");
      }
    }
  }, [isModalOpen, noteTitle, noteTag]); // Rerun when modal opens or relevant props change

  return (
    <Modal
      open={isModalOpen}
      onClose={handleAnimatedClose} // Use animated close for backdrop click or Escape key
      aria-labelledby="form-modal-title"
      aria-describedby="form-modal-description"
      // If you want to style the backdrop similarly to the first example:
      // slotProps={{
      //   backdrop: {
      //     className: "custom-backdrop", // Ensure this class is defined in your CSS
      //   },
      // }}
    >
      {/* MUI Box component replaces the outer div */}
      <Box
        // Apply conditional class names for animation
        className={closing ? "modal-closing-note" : "modal-animate-note"}
        sx={{
          position: "absolute", // Type assertion
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // This will be the base for animation transforms
          width: 300,
          maxWidth: "90%",
          bgcolor: "var(--color-vanilla-cream)",
          color: "var(--color-like-gray)",
          borderRadius: "12px",
          border: "none",
          p: 3,
          boxShadow: 24,
          outline: "none",
          // Animation classes will handle opacity and scale changes
        }}
      >
        {/* Modal Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            id="form-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            Edit Note
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleAnimatedClose} // Use animated close for the 'X' button
            sx={{
              color: "var(--color-medium-gray)",
              "&:hover": {
                color: "var(--color-dark-gray)",
              },
            }}
          >
            <MdClose size={24} />
          </IconButton>
        </Box>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= 17) {
                setTitle(e.target.value);
              }
            }}
            required
            helperText={
              title.length >= 17 ? "Title must be less than 18 characters." : ""
            }
            error={title.length >= 17}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-dark-gray)",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "var(--color-dark-gray)",
                },
              },
            }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel
              id="category-select-label"
              sx={{
                "&.Mui-focused": {
                  color: "var(--color-dark-gray)",
                },
              }}
            >
              Category
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category === null ? "" : category} // Handle null value for Select display
              label="Category"
              onChange={(event) => {
                setCategory(event.target.value as number);
              }}
              required
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  // borderColor: "var(--color-dark-gray)", // Standard border color
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-dark-gray) !important",
                },
              }}
            >
              {tags.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {capitalizeFirstLetter(cat.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              textTransform: "capitalize",
              bgcolor: "var(--color-dark-gray)",
              color: "var(--color-vanilla-cream)",
              fontWeight: "medium",
              py: "12px",
              borderRadius: "9999px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              "&:hover": {
                bgcolor: "var(--color-like-gray)",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default FormModal;
