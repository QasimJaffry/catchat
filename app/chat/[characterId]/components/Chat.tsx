import React from "react";

function Chat({ message, cat }) {
  return (
    <div className="p-4 flex gap-2 items-end">
      <img
        src={cat}
        className="object-cover h-12 w-12 rounded-full shadow-md"
        alt="cat"
      />
      <div className="w-[70%] flex flex-col items-end gap-1">
        <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 text-gray-900 rounded-lg p-2 text-sm border border-dark border-opacity-10 shadow-lg">
          {message}
        </div>
        {/* <span className="text-xs text-gray-400">12:45 pm</span> */}
      </div>
    </div>
  );
}

export default Chat;
