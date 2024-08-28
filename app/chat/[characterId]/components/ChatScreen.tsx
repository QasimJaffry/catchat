import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  onSnapshot,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { useParams } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import UserComponent from "@/components/UserComponent";
import { LuSend } from "react-icons/lu";
import { db } from "@/lib/firebase";

interface Chat {
  message: string;
  timestamp: number;
  sentTo: string;
}

const fetchChats = async (uid1: string, uid2: string) => {
  const q = query(collection(db, `chats_${uid1}_${uid2}`));
  const snapshot = await getDocs(q);
  const chats: Record<string, Chat> = {};
  snapshot.forEach((doc) => {
    chats[doc.id] = doc.data() as Chat;
  });
  return chats;
};

const createChatIfNotExists = async (uid1: string, uid2: string) => {
  const chatRef = doc(db, `chats_${uid1}_${uid2}`);
  const chatSnap = await getDoc(chatRef);
  if (!chatSnap.exists()) {
    await setDoc(chatRef, { messages: [] });
  }
};

const ChatScreen = ({ selectedCat }: { selectedCat: any }) => {
  console.log(selectedCat, "selelel");
  const [chats, setChats] = useState<Record<string, Chat>>({});
  const [message, setMessage] = useState("");
  const { user: currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState<any | null>(null);

  useEffect(() => {
    const fetchChatsAndSaveToCache = async () => {
      console.log("Getting Data: chat");
      await createChatIfNotExists(currentUser?.uid, selectedCat.id);
      const fetchedChats = await fetchChats(currentUser?.uid, selectedCat.id);
      setChats(fetchedChats);
    };
    fetchChatsAndSaveToCache();

    // Set userInfo from currentUser
    setUserInfo(currentUser);

    const q = query(
      collection(db, `chats_${currentUser?.uid}_${selectedCat.id}`)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedChats: Record<string, Chat> = {};
      snapshot.forEach((doc) => {
        updatedChats[doc.id] = doc.data() as Chat;
      });
      setChats(updatedChats);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedCat]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newChat: Chat = {
        message,
        timestamp: Date.now(),
        sentTo: selectedCat.id,
      };
      await addDoc(
        collection(db, `chats_${currentUser?.uid}_${selectedCat.id}`),
        newChat
      );
      await addDoc(
        collection(db, `chats_${selectedCat.id}_${currentUser?.uid}`),
        newChat
      );
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="bg-white border-b-1  p-4">
        <div className="flex items-center justify-between">
          {userInfo && <UserComponent {...(userInfo as any)} />}
        </div>
      </header>
      <main className="flex-grow flex flex-col p-4 gap-4 overflow-y-scroll">
        {chats &&
          Object.values(chats).map((chat) => (
            <div
              key={chat.timestamp}
              className={`flex flex-col ${
                chat.sentTo !== currentUser?.uid ? "items-end" : "justify-start"
              }`}
            >
              <div
                className={`flex flex-col w-fit p-4 rounded-2xl ${
                  chat.sentTo !== currentUser?.uid
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
      <footer className="bg-white border-t-1 p-4 ">
        <div className="flex space-x-2 flex-row items-center">
          <Input
            placeholder="Type a message"
            value={message}
            radius="full"
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="rounded-full"
          />
          <Button
            onClick={sendMessage}
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
