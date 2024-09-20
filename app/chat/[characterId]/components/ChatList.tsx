"use client";

import React, { useEffect, useState } from "react";
import Person from "./Person";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Chat } from "@/types";
import { db } from "@/lib/firebase";

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

  const [, setShowNewChat] = useState(false);
  const [persons, setPersons] = useState(personsData);
  const [search, setSearch] = useState("");
  // const router = useRouter();

  const [chats, setChats] = useState<Chat[]>([]);

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

        console.log(chatData, "chat list");
        setChats(chatData);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <div className="rounded-xl h-auto bg-white text-black border col-span-1">
      <div className="flex p-4 text-xl justify-between border-b border-gray-100">
        <p className="font-semibold text-black">Chats</p>
        <p
          className="text-2xl cursor-pointer"
          onClick={() => setShowNewChat(true)}
        >
          +
        </p>
      </div>
      {selectedCount > 0 && (
        <div className="flex justify-between border-b border-gray-100 p-4">
          <div className="flex gap-2">
            <img
              src="/cross.svg"
              alt="close"
              className="cursor-pointer"
              onClick={() => setSelectedCount(0)}
            />
            <p className="text-xl font-bold font-Nunito">
              {selectedCount} Selected
            </p>
          </div>
        </div>
      )}
      <div className="w-[90%] m-auto my-4 relative">
        <img
          src="/search-normal.svg"
          alt="search"
          className="absolute top-1/4 left-1 size-4.5"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Search"
          className="rounded-xl p-3 pl-9 w-full outline-none bg-slate-100 z-20 "
        />
      </div>

      {chats && chats.length > 0 && (
        <div className="h-[54vh] overflow-y-auto">
          {chats.map((item: any, index: number) => (
            <Person
              id={item?.id}
              index={index}
              name={"name"}
              lastMessage={item?.lastMessage}
              lastMessageTime={item?.updatedAt}
              profile_img={item?.imageSrc}
              selected={false}
              onClick={handleProfileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
