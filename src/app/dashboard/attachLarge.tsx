"use client";
import React, { useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { useModal } from "./modal_context";
import { Client, IMessage } from "@stomp/stompjs";
import { Session } from "next-auth";
import SockJS from "sockjs-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ErrorResponse {
  error: string;
}

export default function AttachFile({ session }: { session: Session | null }) {
  const { openModal } = useModal();
  const client = useRef<Client | null>(null);
  const jwt = session?.accessToken;
  const userEmail = session?.user.email;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { stopLoading } = useModal();
  const router = useRouter();

  useEffect(() => {
    if (!client.current && jwt) {
      const stompClient = new Client({
        webSocketFactory: () =>
          new SockJS(`${apiUrl}/ws?token=${encodeURIComponent(jwt)}`),
        debug: (str: string) => console.log(str),
        onConnect: () => {
          console.log("Connected to WebSocket");

          stompClient.subscribe(
            "/user/queue/summaries",
            (message: IMessage) => {
              stopLoading();
              console.log(message.body);
              const noteId = JSON.parse(message.body);
              router.push(`/note/${noteId}`);
              console.log(noteId);
            }
          );

          stompClient.subscribe("/user/queue/errors", (message: IMessage) => {
            stopLoading();
            const { error }: ErrorResponse = JSON.parse(message.body);
            toast.error("Failed to create note; please try again.");
            console.error("Error:", error);
          });
        },
        onStompError: (frame) => console.error("STOMP error:", frame),
        onWebSocketError: (err) => console.error("WebSocket error:", err),
        onDisconnect: () => console.log("Disconnected"),
      });

      stompClient.activate();
      client.current = stompClient;
    }

    // Always return a cleanup function
    return () => {
      if (client.current) {
        client.current.deactivate();
        console.log("WebSocket client deactivated");
        client.current = null;
      }
    };
  }, [apiUrl, jwt, userEmail, stopLoading]);

  return (
    <div
      onClick={openModal}
      className="px-4 py-2 hidden bg-black text-white rounded-full shadow-md sm:flex items-center justify-center gap-1 
             transition-all active:scale-98 no-select duration-200 ease-in-out hover:bg-like-gray hover:scale-105 hover:shadow-lg"
    >
      <FaPlus size={15} color="white" />
      <p className="text-[14px] font-medium">Create</p>
    </div>
  );
}
