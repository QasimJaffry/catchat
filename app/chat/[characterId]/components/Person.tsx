import React from "react";
import { useRouter } from "next/navigation";
import moment from "moment";

function ChatPerson({
  index,
  profile_img,
  name,
  selected,
  onClick,
  lastMessage,
  lastMessageTime,
  id,
  setSelectedCat,
  cat,
}: any) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        setSelectedCat(cat);
        router.push(`/chat/${id}`);
      }}
      key={id}
      className={`flex bg-secondary flex-col sm:flex-row py-4 rounded-md px-4 justify-between items-center mx-2 cursor-pointer transition-all duration-300 ease-in-out ${
        selected ? "bg-success text-white" : "border-transparent text-white"
      }`}
    >
      <div className="flex gap-4 items-center">
        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
            onClick(index);
          }}
        >
          <img
            src={profile_img}
            className="object-cover h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full " 
            alt={name}
          />
        </div>

        <div className="flex flex-col">
          <p className={`text-base text-sm flex items-center text-white`}>
            {name}
            <span className="ml-2 w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-[10px] ml-auto">
              {moment(lastMessageTime).format("hh:mm A")}
            </span>
          </p>

          {lastMessage && (
            <span className="text-gray-300 text-sm overflow-ellipsis overflow-hidden whitespace-normal">
              {lastMessage.substring(0, 80)}
            </span>
          )}
        </div>
      </div>

    
    </div>
  );
}

export default ChatPerson;
