// import ChatSidebar from "@/components/ChatSideBar";
import ChatList from "./components/ChatList";
import ChatScreen from "./components/ChatScreen";
import { useState } from "react";
// import { cats } from "@/app/page";

interface ChatPageProps {
  params: { characterId: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  return (
    // <div className="flex flex-row w-full h-screen">
    //   <div className="hidden md:flex w-1/4 bg-gray-100 dark:bg-gray-900">
    //     <ChatSidebar />
    //   </div>
    //   <div className="w-full flex md:w-3/4 bg-gray-100 dark:bg-gray-900">
    //     <ChatScreen selectedCatId={params.characterId} />
    //   </div>
    // </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="hidden md:block">
        <ChatList />
      </div>
      <ChatScreen selectedCatId={params.characterId} />
    </div>
  );
}
