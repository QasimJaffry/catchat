"use client";

import { useAuth } from "@/context/AuthContext";
import { useCat } from "@/context/CatContext";
import { db } from "@/lib/firebase";
import { Chat } from "@/types";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Person from "./Person";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ChatList = () => {
  const { user: currentUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const query1 = useSearchParams();

  const [chats, setChats] = useState<Chat[]>([]);
  const { selectedCat, setSelectedCat } = useCat();
  const [isChatListVisible, setIsChatListVisible] = useState(true);

  useEffect(() => {
    const params = query1.get("charactedId");

    //do your modifications on search params
    // params.delete("search");

    console.log(params, "params");
    if (currentUser) {
      const q = query(
        collection(db, "chats"),
        where("userIDs", "array-contains", currentUser?.uid),
        orderBy("lastMessageAt", "desc")
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
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsChatListVisible(window.innerWidth >= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`rounded-xl ${
        isChatListVisible ? "h-full " : "h-20"
      }  bg-secondary text-black border col-span-1 shadow-md overflow-y-auto  sm:w-1/4 `}
    >
      {isChatListVisible ? (
        <div>
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
            <div className="flex items-center justify-center h-screen">
              <p className="text-center text-white">No chats available</p>
            </div>
          )}
        </div>
      ) : (
        chats.length > 0 && (
          <div className="flex space-x-2 h-18 overflow-x-auto px-4">
            {chats.map((chat: any) => (
              <div
                className={`flex flex-col mt-2 cursor-pointer`}
                key={chat?.id}
                onClick={() => {
                  setSelectedCat(chat?.participants?.[1]?.secondUser);
                  router.push(`/chat/${chat?.id}`);
                }}
              >
                <div className={`relative w-12 h-12`}>
                  <img
                    src={chat?.participants?.[1]?.secondUser?.imageSrc}
                    alt={chat?.participants?.[1]?.secondUser?.name}
                    className={`w-full h-full rounded-full ${
                      selectedCat?.id == chat?.participants?.[1]?.secondUser?.id
                        ? "border-2 border-round border-success text-white"
                        : "border-transparent text-white"
                    }`}
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full  " />{" "}
                  {/* Green online indicator */}
                </div>
                <span className="text-xs text-white text-center">
                  {chat?.participants?.[1]?.secondUser?.name}
                </span>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ChatList;
