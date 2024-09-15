import React from "react";

function ChatMessage() {
  return (
    <div className="p-4 flex items-end justify-start flex-row-reverse gap-2">
      <img
        src="/woman.png"
        className="object-cover h-12 w-12 rounded-full "
        alt=""
      />
      <div className="w-[70%]">
        <div className=" bg-[#0A0A56] t rounded-tl-lg rounded-tr-lg rounded-bl-lg p-2 text-sm text-white border border-dark border-opacity-10">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
          magni iste qui veritatis sed non ad officia suscipit doloremque maxime
        </div>
        <span className="text-xs ">12:45 pm</span>
      </div>
    </div>
  );
}

export default ChatMessage;
