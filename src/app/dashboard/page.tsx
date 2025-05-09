import { Open_Sans } from "next/font/google";

import Header from "../_components/header_bar";
import { ModalProvider } from "./modal_context";
import AttachFile from "./attachLarge";
import AttachModal from "./attach_modal";
import { auth } from "../_lib/auth";
import LoadingScreen from "../note/[id]/LoadingScreen";
import { getAllTags, getAllUserNotes } from "../_lib/actions/dashboard/action";
import { NoteData } from "../_lib/definitions";

import SearchBar from "./SearchBar";
import NoteList from "./NoteList";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default async function Dashboard() {
  const session = await auth();
  const notes: NoteData[] = await getAllUserNotes(session?.accessToken);
  const tags = await getAllTags(session?.accessToken);

  console.log(notes);
  console.log(session);

  return (
    <ModalProvider>
      <div
        className={`flex ${openSans} gap-4 flex-col bg-[#f9f8f6] scrollbar-hide text-[#1b140e] p-4 min-h-screen`}
      >
        <Header session={session} />
        <div className="w-full mt-16 cursor-pointer  flex gap-2 sm:justify-end">
          <SearchBar tags={tags} />
          <AttachFile session={session} />
          <AttachModal session={session} />
        </div>
        <NoteList notes={notes} session={session} />
      </div>
      <LoadingScreen />
    </ModalProvider>
  );
}
