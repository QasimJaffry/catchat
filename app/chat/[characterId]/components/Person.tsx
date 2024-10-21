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
      <div className="block lg:flex gap-4 items-center w-full">
        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
            onClick(index);
          }}
        >
          <img
            src={profile_img}
            className="object-cover h-12 w-12 sm:h-14 sm:w-14 md:h-110 md:w-110 rounded-full "
            alt={name}
          />
        </div>

        <div className="flex flex-col w-full flex-1">
          <p
            className={`text-base text-sm flex items-center text-white flex-wrap`}
          >
            {name} {name} {name}
            <span className="w-2 h-2 ml-2 rounded-full bg-green-500"></span>
          </p>

          {lastMessage && (
            <span className="text-gray-300 text-sm overflow-ellipsis overflow-hidden whitespace-normal">
              {lastMessage?.substring(0, 80)}
            </span>
          )}

          <div className="text-[10px] flex items-end justify-end">
            {moment(lastMessageTime).format("hh:mm A")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPerson;
