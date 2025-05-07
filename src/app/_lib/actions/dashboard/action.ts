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
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
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
  token: string | undefined
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/note/summarize`,
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
