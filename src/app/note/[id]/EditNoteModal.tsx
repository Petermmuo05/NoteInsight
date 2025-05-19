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
import { useFormModal } from "./ModalContext";
import { UpdateNoteTitle } from "@/app/_lib/actions/dashboard/action";
import { Tag } from "@/app/_lib/definitions";
import { useModal } from "@/app/dashboard/modal_context";
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
  const { isModalOpen, closeModal } = useFormModal();
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<number | null>(null); // State for the select field
  const { startLoading, stopLoading } = useModal();

  // Define available categories for the select dropdown
  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (category === null) {
      return;
    }

    startLoading(); // Start loading animation or state

    try {
      await UpdateNoteTitle(noteId, { title, id: category }, token);
      console.log("Form submitted:", { title, id: category });
      closeModal(); // Close the modal on successful submit
      toast.success("Note updated successfully!"); // Show success message
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    } finally {
      stopLoading(); // Always stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    if (noteTag) {
      setCategory(noteTag.id); // Set the category to the id of the first tag
    }
    if (noteTitle) {
      setTitle(noteTitle); // Set the title to the note's title
    } else {
      setTitle(""); // Reset title if no note title is provided
    }
  }, [noteTitle, noteTag]); // Dependency array to run effect when tags change

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal} // Allow closing by clicking outside or pressing Escape
      aria-labelledby="form-modal-title"
      aria-describedby="form-modal-description"
    >
      {/* MUI Box component replaces the outer div */}
      <Box
        sx={{
          position: "absolute", // Type assertion for literal string 'absolute'
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300, // Fixed width, matches w-[300px]
          maxWidth: "90%", // Optional: Add max-width for smaller screens

          // Gray Color Scheme and Appearance
          bgcolor: "var(--color-vanilla-cream)", // Using your light background color variable
          color: "var(--color-like-gray)", // Using your dark text color variable
          borderRadius: "12px", // Rounded corners, matches rounded-xl approximately
          border: "none", // No border, matches border-0
          p: 3, // Padding, MUI spacing unit is 8px, so 3*8=24px, matches p-6 approx
          boxShadow: 24, // MUI shadow level
          outline: "none", // Remove the default focus outline on the modal content box
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
            sx={{ fontWeight: "bold" /* Matches font-bold */ }}
          >
            Edit Note
          </Typography>
          {/* MUI IconButton replaces the native close button */}
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              color: "var(--color-medium-gray)" /* Matches text-gray-600 */,
              "&:hover": {
                color:
                  "var(--color-dark-gray)" /* Matches hover:text-black (using your dark gray) */,
              },
            }}
          >
            <MdClose size={24} />
          </IconButton>
        </Box>

        {/* Modal Form */}
        {/* The form element is kept to handle onSubmit */}
        <form onSubmit={handleSubmit}>
          {/* Note Title Field - MUI TextField */}
          <TextField
            autoFocus // Focus automatically on mount
            margin="dense" // Adds some vertical margin
            id="title"
            label="Title" // Label for the input
            type="text"
            fullWidth // Makes the text field take the full width
            variant="outlined" // Apply the outlined style
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= 17) {
                setTitle(e.target.value); // Only update if the length is less than or equal to 17
              }
            }}
            required // Apply HTML required validation
            helperText={
              title.length >= 17 ? "Title must be less than 18 characters." : ""
            } // Display helper text if the limit is reached
            error={title.length >= 17} // Highlight the field in red if the limit is exceeded
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-dark-gray)", // Change outline to dark gray on focus
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "var(--color-dark-gray)", // Change label color to dark gray on focus
                },
              },
            }}
          />

          {/* Category Select Field - MUI Select */}
          {/* FormControl wraps InputLabel and Select */}
          <FormControl fullWidth margin="normal">
            {" "}
            {/* margin="normal" adds standard top/bottom margin */}
            <InputLabel
              id="category-select-label"
              sx={{
                "&.Mui-focused": {
                  color: "var(--color-dark-gray)", // Change label color to dark gray on focus
                },
              }}
            >
              Category
            </InputLabel>{" "}
            {/* Label for the select */}
            <Select
              labelId="category-select-label" // Connects the label to the select
              id="category-select"
              value={category} // Controlled component value
              label="Category" // Required for Outlined and Filled variants of Select for proper label rendering
              onChange={(event) => {
                // Cast the value from the event to number
                setCategory(event.target.value as number);
              }}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--color-dark-gray)", // Change outline to dark gray on focus
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-dark-gray)", // Ensure the outline is gray by default
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

          {/* Submit Button - MUI Button */}
          <Button
            type="submit" // Make it a submit button
            variant="contained" // Use the contained (filled) style
            fullWidth // Make the button full width
            sx={{
              mt: 3, // Margin top, roughly matches mt-5 (MUI spacing 3*8px=24px)
              // Translate Tailwind classes to MUI sx styles
              bgcolor: "var(--color-dark-gray)", // Background color using your variable
              color: "var(--color-vanilla-cream)", // Text color using your light variable
              fontWeight: "medium", // Font weight
              py: "12px", // Vertical padding (approx py-3) - Can use theme.spacing() if you have theme access
              borderRadius: "9999px", // Fully rounded button, matches rounded-full
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", // Example shadow, matches shadow-[0px_4px_8px_rgba(0,0,0,0.2)]
              // Hover styles
              "&:hover": {
                bgcolor: "var(--color-like-gray)", // Darker gray on hover
              },
              // Optional: Responsive padding/margin if needed, translating max-sm classes
              // '@media (max-width: 600px)': { // MUI's 'sm' breakpoint is 600px
              //   mt: 1.5, // max-sm:mt-3 approx
              //   py: '16px', // max-sm:py-4 approx
              // },
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
