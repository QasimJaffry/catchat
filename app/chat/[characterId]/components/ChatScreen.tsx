"use client";

import { useEffect, useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import UserComponent from "@/components/UserComponent";
import { LuSend } from "react-icons/lu";
import {
  fetchChatRecord,
  sendMessage,
  createChatIfNotExists,
} from "@/services/chat";

const ChatScreen = ({ selectedCatId }) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const { user: currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [catId, setCatId] = useState(selectedCatId);
  const [chatExists, setChatExists] = useState(false);

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
          await createChatIfNotExists(currentUser?.uid, catId);
          setChatExists(true);
        }

        await sendMessage(currentUser?.uid + catId, newMessage);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  console.log(userInfo, "chatschats");

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="flex items-center justify-between">
          {userInfo && <UserComponent {...userInfo} />}
        </div>
      </header>
      <main className="flex-grow flex flex-col p-4 gap-4 overflow-y-scroll">
        {chats.map((chat) => (
          <div
            key={chat.timestamp}
            className={`flex items-start gap-2.5 ${
              chat.sentBy !== currentUser?.uid ? "justify-start" : "justify-end"
            }`}
          >
            {/* <img
              className="w-8 h-8 rounded-full"
              src={
                userInfo?.photoURL ||
                "https://static.vecteezy.com/system/resources/previews/010/871/103/original/3d-avatar-dj-png.png"
              } // Use a random image if userInfo is not available
              alt={userInfo?.displayName || "User image"}
            /> */}
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {userInfo?.displayName || "User"}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {new Date(chat.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p className="text-sm font-normal text-gray-900 dark:text-white">
                  {chat.message}
                </p>
              </div>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Delivered
              </span>
            </div>
            <button
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              data-dropdown-placement="bottom-start"
              className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
            <div
              id="dropdownDots"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Reply
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Forward
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Copy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Report
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t p-4">
        <div className="flex space-x-2 flex-row items-center">
          <Input
            placeholder="Type a message"
            value={message}
            radius="full"
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="rounded-full"
          />
          <Button
            onClick={handleSendMessage}
            className="h-14 bg-blue-600 text-xl text-white w-8 rounded-full"
          >
            <LuSend />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default ChatScreen;
