/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Playfair_Display_SC } from "next/font/google";
import React, { useEffect, useState } from "react";
import Navbar from "../dashboard/navbar";
import SettingsIcon from "../dashboard/settings_icon";
import Logo from "../../../public/noteInsight_logo.png";
import NotificationBell from "../dashboard/notification_icon";
import ProfileMenu from "../note/[id]/ProfileMenu";
import { Session } from "next-auth";
import SettingsModal from "./SettingsModal";
import { Tag } from "../_lib/definitions";
import Image from "next/image";
import Link from "next/link";

const playFair = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function Header({
  session,
  tags,
}: {
  session: Session | null;
  tags: Tag[];
}) {
  const [hasShadow, setHasShadow] = useState(false);
  const user = session?.user;
  const userName = user?.username;

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`no-select fixed top-0 py-4  ${
        hasShadow
          ? "bg-vanilla-cream/15 backdrop-blur-lg shadow-md bg-opacity-30"
          : "bg-vanilla-cream"
      }  left-0 px-4 z-10 flex flex-row items-center justify-between w-full`}
    >
      <Link href={"/dashboard"} className="flex flex-row items-center gap-1">
        <Image src={Logo} className="w-6" alt="logo" />
        <h2
          className={`text-2xl font-[800] ${playFair.className} text-[#1C2526]`}
        >
          NoteInsight
        </h2>
      </Link>

      <Navbar />
      <div className="flex flex-row items-center gap-2">
        <div className="hidden md:flex  w-8 h-8 items-center justify-center bg-white rounded-full">
          <SettingsIcon />
        </div>
        {/* <div className="hidden w-8 md:flex h-8 items-center justify-center bg-white rounded-full">
          <NotificationBell />
        </div> */}
        <div className="flex items-center gap-2">
          <ProfileMenu session={session} />
          {userName && (
            <p className="hidden md:inline text-md font-bold ">
              Hi,
              {userName.length > 10 ? `${userName.slice(0, 10)}...` : userName}
            </p>
          )}
        </div>
      </div>
      <SettingsModal tags={tags} token={session?.accessToken} />
    </div>
  );
}
