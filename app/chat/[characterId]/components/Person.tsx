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
}: any) {
  const router = useRouter();
  console.log(id, "id");
  return (
    <div
      // onClick={() => router.push(`/chat/${index + 1}`)}
      onClick={() => router.push(`/chat/${id}`)}
      className="flex dark:bg-white dark:text-white text-black flex-row py-4  rounded-md px-2 justify-between items-center border-b-2 mx-4 cursor-pointer"
    >
      <div className="flex gap-4 ">
        <div className="relative" onClick={() => onClick(index)}>
          <img
            src={profile_img}
            className="object-cover h-12 w-12 rounded-full "
            alt=""
          />
          {selected && (
            <div className="overlay absolute inset-0 flex items-center justify-center ">
              <div className="bg-green-800 opacity-60 h-full w-full absolute rounded-full" />
              <img src="/correct.svg" alt="correct" className="z-10" />
            </div>
          )}
          <p className="w-2 h-2 rounded-full bg-green-500 left-10 top-8 absolute "></p>
        </div>
        <div>
          <p className="text-base font-semibold text-black">{name}</p>
          <span className="text-gray-500 text-xs">{lastMessage}</span>
        </div>
      </div>

      <div>
        <span className="text-xs text-[#AD824B]">
          {moment(lastMessageTime).format("hh:mm")}
        </span>
      </div>
    </div>
  );
}

export default ChatPerson;
