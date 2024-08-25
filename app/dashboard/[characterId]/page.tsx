// app/dashboard/[characterId]/page.tsx
"use client";

import ChatList from "./components/ChatList";
import ChatScreen from "./components/ChatScreen";
import { useState } from "react";

interface ChatPageProps {
  params: { characterId: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  const [selectedChat, setSelectedChat] = useState(params.characterId);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100">
        <ChatList chatId={selectedChat} onSelectChat={setSelectedChat} />
      </div>
      <div className="w-3/4 bg-white">
        <ChatScreen chatId={selectedChat} />
      </div>
    </div>
  );
}
