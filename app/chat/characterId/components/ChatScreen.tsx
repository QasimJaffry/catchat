"use client";

import { useAuth } from "@/context/AuthContext";
import { useCat } from "@/context/CatContext";
import {
  createChatIfNotExists,
  fetchChatRecord,
  sendMessage,
} from "@/services/chat";
import { useEffect, useState, useRef } from "react";
import Chat from "./Chat";
import Message from "./Message";
import { IoSend } from "react-icons/io5";

interface ChatMessage {
  id?: string;
  message: string;
  sentBy?: string;
  role: string;
}

const ChatScreen: React.FC = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const { user: currentUser } = useAuth();
  const [chatExists, setChatExists] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { selectedCat } = useCat();

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentUser?.uid && selectedCat) {
      let extractedCatId = selectedCat.id;

      const uid1 = currentUser.uid;
      const uid2 = extractedCatId;

      const fetchChatsAndListen = async () => {
        setLoading(true);
        const unsubscribe = fetchChatRecord(uid1 + uid2, (chatData: any) => {
          if (chatData) {
            setChats(chatData.thread || []);
            setChatExists(true);
          } else {
            setChatExists(false);
          }
          setLoading(false);
        });
        return unsubscribe;
      };

      fetchChatsAndListen().catch((error) =>
        console.error("Error setting up chat listener:", error)
      );
    }
  }, [selectedCat, currentUser]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage: ChatMessage = {
        message,
        sentBy: currentUser?.uid,
        role: "human",
      };

      try {
        if (!chatExists) {
          await createChatIfNotExists(currentUser, selectedCat);
          setChatExists(true);
        }

        if (currentUser?.uid && selectedCat?.id) {
          await sendMessage(currentUser.uid + selectedCat.id, newMessage);
          setMessage("");
          setIsTyping(true);

          const chatId = currentUser.uid + selectedCat.id;

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/chat/${chatId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(selectedCat),
            }
          );

          if (response.ok) {
            setIsTyping(false);
          } else {
            console.error("Error generating message:", response.statusText);
            setIsTyping(false);
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="flex-1 h-full">
      {/* Header with cat image and name */}
      {selectedCat && (
        <header className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg text-white rounded-md">
          <img
            src={selectedCat?.imageSrc}
            alt={selectedCat?.name}
            className="w-14 h-14 rounded-full border-2 border-white"
          />
          <h1 className="text-xl font-bold">{selectedCat?.name}</h1>
        </header>
      )}

      {/* Chat and content area */}
      <div className="flex-grow md:h-[64vh]">
        {loading ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Loading chat...
          </div>
        ) : chats && chats.length > 0 ? (
          <div className="h-[64vh] overflow-y-auto">
            {chats.map((chat, index) => (
              <div key={index} className={`mb-0`}>
                {chat?.sentBy === currentUser?.uid ? (
                  <div key={chat?.id}>
                    <Message message={chat?.message} id={chat?.id} />
                  </div>
                ) : (
                  <div key={chat?.id}>
                    <Chat
                      message={chat?.message}
                      id={chat?.id}
                      cat={selectedCat?.imageSrc}
                    />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No chat available. Start a conversation!
          </div>
        )}

        {isTyping && (
          <div className="text-gray-500 text-sm italic px-4 pt-2 animate-float">
            {selectedCat?.name} is typing...
          </div>
        )}

        <footer className="md:absolute bottom-0 w-full mt-3 md:m-0 md:w-3/4 border-gray-300">
          <div className="flex items-center gap-2 mx-3">
            {/* Input bar */}
            <input
              type="text"
              className="bg-white w-full rounded-xl text-black p-3 outline-none"
              placeholder="Type Here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />

            {/* Send button */}
            <button
              className="w-12 h-12 flex justify-center items-center bg-indigo-600 rounded"
              onClick={handleSendMessage}
            >
              <IoSend className="w-6 h-6 text-white justify-center items-center" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatScreen;
