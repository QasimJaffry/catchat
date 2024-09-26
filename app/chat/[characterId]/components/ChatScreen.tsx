// app/chat/[characterId]/components/ChatScreen.tsx

"use client";

import { useAuth } from "@/context/AuthContext";
import { useCat } from "@/context/CatContext";
import {
  createChatIfNotExists,
  fetchChatRecord,
  sendMessage,
} from "@/services/chat";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import Message from "./Message";

// Define types for props and state
interface ChatScreenProps {
  selectedCatId: string;
}

interface ChatMessage {
  id: string;
  message: string;
  sentBy: string;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ selectedCatId }) => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const { user: currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [catId, setCatId] = useState<string>(selectedCatId);
  const [chatExists, setChatExists] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const { selectedCat, setSelectedCat } = useCat();

  useEffect(() => {
    if (currentUser?.uid && selectedCatId) {
      let extractedCatId = selectedCatId;

      // Extract cat ID from selectedCatId
      if (selectedCatId.includes(currentUser.uid)) {
        extractedCatId = selectedCatId.replace(currentUser.uid, "");
      }

      setCatId(extractedCatId);

      const uid1 = currentUser.uid;
      const uid2 = extractedCatId;

      const fetchChatsAndListen = async () => {
        const unsubscribe = await fetchChatRecord(uid1 + uid2, (chatData) => {
          if (chatData) {
            setChats(chatData.thread || []);
            setChatExists(true);
          } else {
            setChatExists(false);
          }
        });
        return unsubscribe;
      };

      fetchChatsAndListen().catch((error) =>
        console.error("Error setting up chat listener:", error)
      );

      setUserInfo(currentUser);
    }
  }, [selectedCatId, currentUser]);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage: ChatMessage = {
        message,
        sentBy: currentUser?.uid,
      };

      try {
        if (!chatExists) {
          await createChatIfNotExists(currentUser, selectedCat);
          setChatExists(true);
        }

        await sendMessage(currentUser?.uid + catId, newMessage);
        setMessage("");
        setIsTyping(true);

        const chatId = currentUser?.uid + catId;

        const response = await fetch(
          `http://localhost:3000/api/chat/${chatId}`,
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
      } catch (error) {
        console.error("Error sending message:", error);
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="col-span-2 h-screen "> {/* Full height and width */}
      <div className="flex-grow overflow-y-auto"> {/* Chat area */}
        {chats && chats.length > 0 && (
          <div className="h-[calc(95vh-60px)] overflow-y-auto">
            {chats.map((chat) => {
              return (
                <div key={chat?.id}>
                  {chat?.sentBy === currentUser?.uid ? (
                    <Message message={chat?.message} />
                  ) : (
                    <Chat
                      message={chat?.message}
                      cat={selectedCat?.imageSrc}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {isTyping && (
          <div className="text-gray-500 text-sm italic px-4 pt-2 animate-float ml-4">
            {selectedCat?.name} is typing...
          </div>
        )}
      </div>

      <footer className="px-4 flex items-center gap-2"> {/* Input search bar */}
        <div className="relative w-[90%]">
          <input
            type="text"
            className="bg-white w-full rounded-xl text-black p-4 outline-none font-poppin text-xs"
            placeholder="Type Here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
        </div>

        <div
          className="w-12 h-12 rounded-3xl bg-secondary relative"
          onClick={() => handleSendMessage()}
        >
          <img
            className="absolute top-[25%] left-[25%] cursor-pointer"
            src="/send.svg"
            alt="send"
          />
        </div>
      </footer>
    </div>
  );
};

export default ChatScreen;