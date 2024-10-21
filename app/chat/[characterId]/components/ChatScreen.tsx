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
import { IoSend } from "react-icons/io5";

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

  console.log(selectedCatId, "selectedCatId", selectedCat);

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

  const MessageDisplay = ({ message }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < message.length) {
          setDisplayedText((prev) => prev + message.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust speed as necessary

      return () => clearInterval(interval); // Cleanup interval on unmount
    }, [message]);

    return <div>{displayedText}</div>;
  };

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
      } catch (error) {
        console.error("Error sending message:", error);
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="col-span-2 h-screen flex flex-col">
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
      <div className="flex-grow overflow-y-auto md:p-4">
        {chats && chats.length > 0 ? (
          <div>
            {chats.map((chat) => (
              <div key={chat?.id}>
                {chat?.sentBy === currentUser?.uid ? (
                  <Message message={chat?.message} />
                ) : (
                  <Chat message={chat?.message} cat={selectedCat?.imageSrc} />
                )}
              </div>
            ))}
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
      </div>

      {/* Footer */}
      <footer className="p-4 border-t border-gray-300 ">
        <div className="flex items-center gap-2">
          {/* Input bar */}
          <div className="relative w-full">
            <input
              type="text"
              className="bg-white w-full rounded-xl text-black p-4 outline-none"
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
  );
};

export default ChatScreen;
