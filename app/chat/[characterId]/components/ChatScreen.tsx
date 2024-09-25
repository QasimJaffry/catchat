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

const ChatScreen = ({ selectedCatId }: any) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const { user: currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [catId, setCatId] = useState(selectedCatId);
  const [chatExists, setChatExists] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { selectedCat, setSelectedCat } = useCat();

  useEffect(() => {
    if (currentUser?.uid && selectedCatId) {
      let extractedCatId = selectedCatId;

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
      const newMessage = {
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

        console.log(selectedCat, "selectedCat");
        const response = await fetch(
          `http://localhost:3000/api/chat/${chatId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedCat), // Pass selectedCat as body
          }
        );

        if (response.ok) {
          setIsTyping(false);
        } else {
          console.error("Error generating message:", response.statusText);
          // Clear typing indicator even if the API call fails
          setIsTyping(false);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        // Clear typing indicator in case of an error
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="col-span-2 h-full">
      <div className="rounded-xl h-full bg-background border flex flex-col">
        <div className="flex flex-row py-4 px-2 justify-between items-center bg-white">
          <div className="flex gap-4 ">
            <div className="relative">
              <img
                src={selectedCat?.imageSrc}
                className="object-cover h-12 w-12 rounded-full"
                alt=""
              />
              <p className="w-3 h-3 rounded-full bg-green-400 left-10 top-8 absolute"></p>
            </div>
            <div>
              <p className="text-sm text-black font-semibold">
                {selectedCat?.name}
              </p>
              <span className="text-gray-500 text-xs">online</span>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          {chats && chats.length > 0 && (
            <div className="h-[52vh] overflow-y-auto">
              {chats.map((chat) => {
                return (
                  <div key={chat?.id}>
                    {chat?.sentBy == currentUser?.uid ? (
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

          {/* Typing indicator */}
          {isTyping && (
            <div className="text-gray-500 text-sm italic px-4 pt-2 animate-float ml-4">
              {selectedCat?.name} is typing...
            </div>
          )}

          <footer className="px-4 py-2 flex items-center gap-2 ">
            <div className="relative w-[90%]">
              <input
                type="text"
                className="bg-white w-[100%] rounded-xl text-black p-4 rounded-full outline-none font-poppin text-xs"
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
      </div>
    </div>
  );
};

export default ChatScreen;
