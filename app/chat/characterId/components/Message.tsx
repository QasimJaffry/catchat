import React from "react";

function ChatMessage({ message, id }: any) {
  return (
    <div
      key={id}
      className="p-4 flex items-end justify-start flex-row-reverse gap-2"
    >
      <div className="max-w-[70%]">
        <div className="bg-success text-gray-100 rounded-lg p-3 text-sm border-opacity-10 shadow-lg">
          {message}
        </div>
        {/* <span className="text-xs text-gray-400">12:45 pm</span> */}
      </div>
    </div>
  );
}

export default ChatMessage;
