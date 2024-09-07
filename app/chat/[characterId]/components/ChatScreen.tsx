import { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import UserComponent from "@/components/UserComponent";
import { LuSend } from "react-icons/lu";
import {
  fetchChatRecord,
  fetchChatsList,
  sendMessage,
  createChatIfNotExists,
} from "@/services/chat";
// import {
//   fetchChatsList,
//   fetchChatRecord,
//   sendMessage,
//   createChatIfNotExists,
// } from "@/services/firebaseService";

const ChatScreen = ({ selectedCatId }) => {
  console.log(selectedCatId, "selectedCatId");
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const { user: currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [catId, setCatId] = useState(selectedCatId);
  const [chatExists, setChatExists] = useState(false);

  useEffect(() => {
    if (currentUser?.uid && selectedCatId) {
      let extractedCatId = selectedCatId;

      // Check if selectedCatId contains currentUserId
      if (selectedCatId.includes(currentUser.uid)) {
        // Extract catId from chatId
        extractedCatId = selectedCatId.replace(currentUser.uid, "");
      }

      console.log(extractedCatId, "extractedCatId");

      // Set the extracted catId in state
      setCatId(extractedCatId);

      const uid1 = currentUser.uid;
      const uid2 = extractedCatId;

      // Fetch chats list and listen for changes
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

      // Set userInfo from currentUser
      setUserInfo(currentUser);
    }
  }, [selectedCatId, currentUser]);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = {
        message,
        timestamp: Date.now(),
        sentBy: currentUser?.uid,
      };
      try {
        console.log(newMessage, "newMessage");

        // Create chat if it doesn't exist
        if (!chatExists) {
          await createChatIfNotExists(currentUser?.uid, catId);
          setChatExists(true);
        }

        // Send the message
        await sendMessage(currentUser?.uid + catId, newMessage);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  console.log(chats, "chats");

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="bg-white border-b-1 p-4">
        <div className="flex items-center justify-between">
          {userInfo && <UserComponent {...userInfo} />}
        </div>
      </header>
      <main className="flex-grow flex flex-col p-4 gap-4 overflow-y-scroll">
        {chats.map((chat) => (
          <div
            key={chat.timestamp}
            className={`flex flex-col ${
              chat.sentBy !== currentUser?.uid ? "items-end" : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col w-fit p-4 rounded-2xl ${
                chat.sentBy !== currentUser?.uid
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex-grow">
                <p>{chat.message}</p>
              </div>
              <div className="flex-shrink">
                <p className="text-xs">
                  {new Date(chat.timestamp).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>
      <footer className="bg-white border-t-1 p-4">
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
