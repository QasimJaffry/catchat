"use client";
import { useContext, useEffect, useState } from "react";

import { Spacer } from "@nextui-org/react";
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
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-100 ">
      {/* searchbar */}
      <div className=" flex flex-row bg-white p-4 m-2 rounded-2xl items-center space-x-2 shadow-2xl shadow-gray-200   ">
        <input
          className="w-full outline-none text-lg"
          placeholder="Search"
          value={search}
          // onChange={handleSearch}
        />
        <SearchIcon className="text-xl cursor-pointer text-gray-600" />
      </div>
      <Spacer y={2} />
      <div>
        {search.length > 0
          ? filteredUsers.map((user) => (
              <div
                key={user.uid}
                className="p-4 m-2 bg-white cursor-pointer rounded-2xl"
                onClick={() => router.push(`/chat/${user.uid}`)}
              >
                <UserComponent {...user} />
              </div>
            ))
          : chats.map((user) => (
              <div
                key={user.id}
                className="p-4 m-2 bg-white cursor-pointer rounded-2xl"
                onClick={() => router.push(`/chat/${user.id}`)}
              >
                <UserComponent {...user} />
              </div>
            ))}
      </div>
      {/* footer for setting page */}
      <div className="absolute bottom-0 w-full">
        <div
          className="flex flex-row items-center w-full shadow-2xl shadow-gray-300  rounded-t-2xl p-4 font-medium bg-white text-gray-700 cursor-pointer justify-between "
          onClick={() => router.push("/chat/settings")}
        >
          <p>Settings</p>
          <LuArrowRight />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
