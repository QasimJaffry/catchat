import React from "react";

function ChatMessage({ message }) {
  return (
    <div className="p-4 flex items-end justify-start flex-row-reverse gap-2">
      {/* <img
        src="/woman.png"
        className="object-cover h-12 w-12 rounded-full "
        alt=""
      /> */}
      <div className="w-[70%]">
        <div className="bg-gradient-to-tl from-purple-300 via-pink-300 to-purple-200 text-gray-700 rounded-lg p-3 text-sm border border-dark border-opacity-10 shadow-lg">
          {message}
        </div>
        {/* <span className="text-xs text-gray-400">12:45 pm</span> */}
      </div>
    </div>
  );
}

export default ChatMessage;
