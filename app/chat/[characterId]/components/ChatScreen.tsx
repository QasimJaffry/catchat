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

        console.log(response, "resappp");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="col-span-2">
      <div className=" rounded-xl h-auto bg-white border-[1px] ">
        <div className="flex flex-row py-4 px-2 justify-between items-center border-b-2 ">
          <div className="flex gap-4 ">
            <div className="relative">
              <img
                src={selectedCat?.imageSrc}
                className="object-cover h-12 w-12 rounded-full"
                alt=""
              />
              <p className="w-3 h-3 rounded-full bg-green-400 left-8 top-8 absolute"></p>
            </div>
            <div>
              <p className="text-sm text-black font-semibold">
                {selectedCat?.name}
              </p>
              <span className="text-gray-500 text-xs">online</span>
            </div>
          </div>

          {/* <span className="mr-4">
            <img src="/ellipsis-solid.svg" className="h-6 w-6" alt="ellipsis" />
          </span> */}
        </div>

        <div className="h-auto">
          {chats && chats.length > 0 && (
            <div className="h-[52vh] overflow-y-auto">
              {chats.map((chat) => {
                console.log(selectedCat, "selectedCat");
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

          <footer className=" p-4 flex items-center gap-2">
            <div className="relative w-[90%]">
              <input
                type="text"
                className="bg-gray-100 w-[100%] text-black p-4 rounded-full outline-none font-poppin text-xs "
                placeholder="Type Here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              {/* <div className="flex gap-2 absolute top-1/4 right-4">
                <img src="/paper-clip.svg" alt="" />
              </div> */}
            </div>

            <div
              className="w-12 h-12 rounded-3xl bg-blue-700 relative"
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
