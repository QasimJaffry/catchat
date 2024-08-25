// app/dashboard/[characterId]/components/ChatScreen.tsx
"use client";
import useSWR from "swr";
import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Message } from "@/types";
import { fetcher } from "@/utils/fetcher";

interface ChatScreenProps {
  chatId: string;
}

export default function ChatScreen({ chatId }: ChatScreenProps) {
  const { data, error, mutate } = useSWR<{ messages: Message[] }>(
    `/api/chats/${chatId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data()) as Message[];
      mutate({ messages }, false);
    });

    return () => unsubscribe();
  }, [chatId, mutate]);

  if (error) return <div>Failed to load chat data</div>;
  if (!data) return <div>Loading chat data...</div>;

  return (
    <div className="p-4 flex-grow">
      {data.messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.senderId === "AI" ? "ai" : "user"}`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}
