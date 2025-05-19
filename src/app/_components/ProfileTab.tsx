"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Profile from "../../../public/profilehuman.jpg"; // Replace with fallback image
import { useSession } from "next-auth/react";
import {
  updateUser,
  uploadProfilePicture,
} from "../_lib/actions/dashboard/action"; // ✅ Add this
import toast from "react-hot-toast";

export default function ProfileTab() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user.username || "");
  const [hasChanged, setHasChanged] = useState(false);
  const [email, setEmail] = useState(session?.user.email || "");
  const [imageUrl, setImageUrl] = useState(session?.user.image || null); // 👈 add user image
  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect to track changes in the name and email fields
  useEffect(() => {
    if (name !== session?.user.username || email !== session?.user.email) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [name, email, session?.user.username, session?.user.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast.loading("Updating user...");
      const data = await updateUser(session?.accessToken, {
        token: session?.accessToken,
        name,
        email,
      });
      await update({
        user: { username: data.firstName, email: data.email },
        accessToken: data.token,
      });
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      toast.dismiss();
      setHasChanged(false);
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      toast.loading("Uploading image...");
      const url = await uploadProfilePicture(formData, session?.accessToken); // 👈 your backend handler
      setImageUrl(url);
      await update({
        user: { ...session?.user, image: url },
        accessToken: session?.accessToken,
      });
      toast.success("Profile picture updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full justify-center mb-3 flex">
        <div
          onClick={handleProfileImageClick}
          className="w-[80px] h-[80px] bg-gray-400 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
        >
          <Image
            src={imageUrl || Profile}
            width={80}
            height={80}
            alt="Profile"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-400 mb-1">Name</label>
        <div className="w-full relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-white border border-dark-gray focus:outline-none focus:ring-2 focus:ring-like-gray"
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-sm text-gray-400 mb-1">Email</label>
        <input
          type="email"
          value={email}
          disabled
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-md text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-like-gray"
        />
      </div>

      {/* Conditionally render the Submit button */}
      {hasChanged && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 w-fit mx-auto bg-black text-white rounded-md hover:bg-dark-gray transition-colors"
        >
          Save Changes
        </button>
      )}
    </div>
  );
}
