import { useState } from "react";
import { FaCheck, FaLock, FaPlus, FaTimes, FaTrash } from "react-icons/fa"; // Import icons
import { Tag } from "../_lib/definitions";
import { createTag } from "../_lib/actions/dashboard/action";
import { deleteTagById } from "../_lib/actions/dashboard/action"; // Import deleteTagById function
import toast from "react-hot-toast";

export default function TagTab({
  tags,
  token,
}: {
  tags: Tag[];
  token: string | undefined;
}) {
  const [isCreating, setIsCreating] = useState(false); // State to toggle input field
  const [newTag, setNewTag] = useState(""); // State for the new tag input

  const handleCreateTag = async () => {
    if (newTag.trim() !== "") {
      await createTag({ name: newTag.trim() }, token);
      toast.success("Tag successfully created"); // Call the deleteTagById function
      // Create a new tag object
      setNewTag(""); // Clear the input field
      setIsCreating(false); // Hide the input field
    }
  };

  const handleCancel = () => {
    setNewTag(""); // Clear the input field
    setIsCreating(false); // Hide the input field
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTagById(id, token);
      toast.success("Tag successfully deleted"); // Call the deleteTagById function
      console.log(`Tag with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete tag with ID ${id}:`, error);
    }
  };

  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="text-sm flex flex-col gap-2">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold text-xl">Tags</h1>
        <button
          disabled={isCreating}
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-1 px-3 py-2 text-[12px] transition-all active:scale-98 no-select duration-200 ease-in-out hover:bg-gray-500 hover:scale-105 hover:shadow-lg bg-gray-600 rounded-2xl text-white"
        >
          <FaPlus size={12} />
          <span>Create Tag</span>
        </button>
      </div>
      {isCreating && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter new tag"
            className="px-3 py-2 rounded-md text-white border border-light-gray focus:outline-none focus:ring-2 focus:ring-like-gray"
          />
          <button
            onClick={handleCreateTag}
            className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            aria-label="Add"
          >
            <FaCheck size={14} />
          </button>
          <button
            onClick={handleCancel}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            aria-label="Cancel"
          >
            <FaTimes size={14} />
          </button>
        </div>
      )}
      <ul className="mb-4">
        {tags.map((tag) => (
          <li
            key={tag.id}
            className="mb-2 border border-light-gray p-2 rounded-lg text-sm flex items-center justify-between"
          >
            <span>{capitalizeFirstLetter(tag.name)}</span>
            {tag.isDefault ? (
              <FaLock className="text-gray-400" />
            ) : (
              <FaTrash
                className="text-gray-400 cursor-pointer hover:text-red-500 transition-all active:scale-98 no-select duration-200 ease-in-out"
                onClick={() => handleDelete(tag.id)} // Call handleDelete on click
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
