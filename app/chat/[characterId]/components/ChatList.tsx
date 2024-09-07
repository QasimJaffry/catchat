import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { Chat } from "@/types";
import { Card, CardBody, Spacer } from "@nextui-org/react";

export default function ChatList({ chatId, onSelectChat }: ChatListProps) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Chat[];

      setChats(chatData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="text-xl font-bold text-center">Chats</p>
      <Spacer y={1} />
      <div>
        {chats.map((chat) => (
          <Card
            key={chat.id}
            isPressable
            isHoverable
            onClick={() => onSelectChat(chat.id)}
            css={{
              backgroundColor: chat.id === chatId ? "$blue200" : "$white",
              marginBottom: "$4",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <CardBody>
              <p className="text-lg font-semibold">{chat.name}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
