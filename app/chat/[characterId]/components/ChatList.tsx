// app/dashboard/[characterId]/components/ChatList.tsx
"use client";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { Chat } from "@/types";

interface ChatListProps {
  chatId: string;
  onSelectChat: (chatId: string) => void;
}

export default function ChatList({ chatId, onSelectChat }: ChatListProps) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Chat[];

      console.log(chatData, "chatData");
      setChats(chatData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`cursor-pointer p-2 ${
              chat.id === chatId ? "bg-blue-200" : ""
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
