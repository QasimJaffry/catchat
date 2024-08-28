"use client";

import ChatSidebar from "@/components/ChatSideBar";
import ChatList from "./components/ChatList";
import ChatScreen from "./components/ChatScreen";
import { useState } from "react";
import { cats } from "@/app/page";

interface ChatPageProps {
  params: { characterId: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  const [selectedChat, setSelectedChat] = useState(params.characterId);
  const selectedCat = cats.find(
    (cat) => cat.id === parseInt(params.characterId)
  );

  return (
    <div className="flex flex-row w-full ">
      <div className="hidden md:flex w-1/4">
        <ChatSidebar />
      </div>
      <div className="w-full flex md:w-3/4">
        <ChatScreen selectedCat={selectedCat} />
      </div>
    </div>
  );
}
