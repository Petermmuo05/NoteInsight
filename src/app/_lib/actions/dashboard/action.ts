"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

interface registerDataType {
  firstName: string;
  email: string;
  password: string;
}

interface updateNoteData {
  title: string;
  id: number;
}

interface createTagData {
  name: string;
}

export async function Register(registerData: registerDataType) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      registerData
    );

    //revalidate the projectmst path
    revalidatePath("/dashboard");
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Optionally re-throw the error to be handled by the calling function
  }
}

export async function getNoteById(id: number, token: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/note/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
}

export async function createTag(
  tagData: createTagData,
  token: string | undefined
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/tag`,
      tagData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Revalidate the tags path if necessary
    revalidatePath("/");
    return response.data; // Return the created tag data
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error; // Optionally re-throw the error to be handled by the calling function
  }
}

export async function getAllTags(token: string | undefined) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tag`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tag:", error);
    throw error;
  }
}

export async function getAllUserNotes(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/note`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

export async function deleteNoteById(id: number, token: string | undefined) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/note/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/");
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

export async function deleteTagById(id: number, token: string | undefined) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/tag/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/");
    return response.data;
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw error;
  }
}

export async function updateFavorite(
  id: number,
  token: string | undefined,
  isFavorite: boolean
) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/note/${id}/favorite`,
      { isFavorite },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
}

export async function updateUser(
  token: string | undefined,
  userData: { token: string | undefined; name: string; email: string }
) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function UpdateNoteTitle(
  noteId: number,
  formData: updateNoteData,
  token: string | undefined
) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/note/${noteId}/title`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
}

export async function UploadFile(
  formData: FormData,
  token: string | undefined,
  promptKey: number
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/note/summarize/${promptKey}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function uploadProfilePicture(
  formData: FormData,
  token: string | undefined
): Promise<string> {
  if (!token) throw new Error("Unauthorized");

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/upload-picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    revalidatePath("/dashboard");
    return response.data.imageUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Upload failed:", error.response?.data || error.message);
    throw new Error("Image upload failed");
  }
}

// const startSummarization = async () => {
//   setIsLoading(true);
//   try {
//     const response = await fetch(`${apiUrl}/note/summarize`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${jwt}`,
//       },
//       body: JSON.stringify({
//         text: "The old lighthouse keeper meticulously polished the brass railing, the rhythmic swoosh of the polishing cloth a familiar comfort against the crashing waves below. He often wondered about the ships that passed in the night, their distant lights like fleeting stars on the dark horizon, each carrying its own untold stories across the vast ocean. Tonight, a thick fog was rolling in, muffling the usual roar of the sea and casting an eerie silence over the lonely tower. He hoped they would all navigate safely",
//       }),
//     });
//     if (!response.ok) throw new Error("Failed to start summarization");
//     const taskId = await response.text();
//     console.log("Task ID:", taskId);
//   } catch (error) {
//     console.error("Summarization error:", error);
//     setIsLoading(false);
//   }
// };

export async function getReference(
  data: {
    email: string;
    amount: number;
    currency: string;
  },
  token: string | undefined
) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/paystack/initialize`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: data,
    }
  );
  return res.data.reference as string;
}

// Server Action to verify transaction
export async function verify(reference: string, token: string | undefined) {
  console.log("Verifying transaction with reference:", reference);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/paystack/verify`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { reference },
    }
  );
  return res.data.status === "success";
}
