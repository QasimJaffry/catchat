"use client";

import React, { useEffect, useState } from "react";
import Person from "./Person";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Chat } from "@/types";
import { db } from "@/lib/firebase";
import { FaArrowRight, FaPaw } from "react-icons/fa"; // Import arrow icon
import { useCat } from "@/context/CatContext";

// default persons
export const personsData = [
  {
    profile_img: "/man-01.png",
    name: "Arthur James",
    selected: false,
  },
  {
    profile_img: "/woman.png",
    name: "John Smith",
    selected: false,
  },
  {
    profile_img: "/man.png",
    name: "Emily Johnson",
  },
  {
    profile_img: "/man-01.png",
    name: "Oliver Davis",
  },
  {
    profile_img: "/woman.png",
    name: "Sophia Lee",
  },
  {
    profile_img: "/man.png",
    name: "William Brown",
  },
];

const ChatList = () => {
  const [selectedCount, setSelectedCount] = useState(0);
  const { user: currentUser } = useAuth();
  const [showNewChat, setShowNewChat] = useState(false);
  const [persons, setPersons] = useState(personsData);
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false); // State to track mobile chat visibility

  const { selectedCat, setSelectedCat } = useCat();

  const handleProfileClick = (clickedIndex: number) => {
    setPersons((prevPersons: any) =>
      prevPersons.map((obj: any, index: number) =>
        index === clickedIndex ? { ...obj, selected: !obj.selected } : obj
      )
    );
  };

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

        setChats(chatData);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <div className="rounded-xl h-auto bg-white text-black border col-span-1 shadow-md">
      <div className="flex p-4 text-xl justify-between border-b border-gray-200 items-center">
        <p className="font-semibold text-black">Chats</p>
        <div className="flex items-center space-x-2">
          {/* <p
            className="text-2xl cursor-pointer"
            onClick={() => setShowNewChat(true)}
          >
            +
          </p> */}
          {/* Arrow Icon for Mobile View */}
          <FaArrowRight
            className={`text-2xl cursor-pointer lg:hidden ${
              isMobileChatOpen ? "rotate-90" : ""
            }`}
            onClick={() => setIsMobileChatOpen(!isMobileChatOpen)}
          />
        </div>
      </div>

      {/* <div className="w-[90%] m-auto my-4 relative">
        <img
          src="/search-normal.svg"
          alt="search"
          className="absolute top-1/4 left-1 size-4.5"
        />
        <input
          type="text"
          placeholder="Search"
          className="rounded-xl p-3 pl-9 w-full outline-none bg-slate-100 z-20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> */}

      {/* Chats Container */}
      <div
        className={`h-[54vh] overflow-y-auto ${
          isMobileChatOpen ? "block" : "hidden lg:block"
        }`}
      >
        {chats.length > 0 ? (
          chats.map((item: any, index: number) => (
            <Person
              key={item?.id}
              id={item?.id}
              index={index}
              name={item?.participants?.[1]?.secondUser?.name}
              lastMessage={item?.lastMessage}
              lastMessageTime={item?.lastMessageAt}
              profile_img={item?.participants?.[1]?.secondUser?.imageSrc}
              selected={
                selectedCat?.id == item?.participants?.[1]?.secondUser?.id
              }
              cat={item?.participants?.[1]?.secondUser}
              setSelectedCat={setSelectedCat}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No chats available</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
