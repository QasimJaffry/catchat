"use client";
import { useContext, useEffect, useState } from "react";

import { CardBody, Spacer } from "@nextui-org/react";
import { Card, Input } from "@nextui-org/react"; // Import NextUI components
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { LuArrowRight } from "react-icons/lu";
import { SearchIcon } from "./SearchIcon";
import UserComponent from "./UserComponent";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { Chat } from "@/types";

// get all users from firestore
const fetchUsers = async (): Promise<any> => {
  const q = query(collection(db, "users"));
  const usersSnapshot = await getDocs(q);
  const users: any = [];
  usersSnapshot.forEach((doc) => {
    users.push({ uid: doc.id, ...doc.data() } as any);
  });
  return users;
};

const ChatSidebar = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, "chats"),
        where("userIDs", "array-contains", currentUser?.uid),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Chat[];

        console.log(chatData, "chat list");
        setChats(chatData);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <div className="relative w-full h-screen bg-gray-100 ">
      {/* searchbar */}
      <div className="flex flex-row p-4 m-2 rounded-2xl items-center space-x-2 shadow-lg">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Uncomment and implement search
        />
        <SearchIcon className="text-xl cursor-pointer text-gray-600 hover:text-blue-500 transition-colors duration-200" />
      </div>
      <Spacer y={2} />
      <div>
        {search.length > 0
          ? filteredUsers.map((user) => (
              <Card
                key={user.uid}
                isPressable
                isHoverable
                onClick={() => router.push(`/chat/${user.uid}`)}
              >
                <Card>
                  <CardBody>
                    <UserComponent {...user} />
                  </CardBody>
                </Card>
              </Card>
            ))
          : chats.map((chat) => (
              <Card
                key={chat.id}
                isPressable
                isHoverable
                onClick={() => router.push(`/chat/${chat.id}`)}
              >
                <CardBody>
                  <UserComponent {...chat} />
                </CardBody>
              </Card>
            ))}
      </div>
      {/* footer for setting page */}
      <div className="absolute bottom-0 w-full">
        <Card
          isPressable
          isHoverable
          onClick={() => router.push("/chat/settings")}
        >
          <CardBody>
            <p className="font-medium text-gray-700">Settings</p>
          </CardBody>
          <LuArrowRight />
        </Card>
      </div>
    </div>
  );
};

export default ChatSidebar;
