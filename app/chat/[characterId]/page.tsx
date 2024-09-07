import ChatSidebar from "@/components/ChatSideBar";
import ChatList from "./components/ChatList";
import ChatScreen from "./components/ChatScreen";
import { useState } from "react";
import { cats } from "@/app/page";

interface ChatPageProps {
  params: { characterId: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="hidden md:flex w-1/4 bg-gray-100 dark:bg-gray-900">
        <ChatSidebar />
      </div>
      <div className="w-full flex md:w-3/4 bg-gray-100 dark:bg-gray-900">
        <ChatScreen selectedCatId={params.characterId} />
      </div>
    </div>
  );
}
