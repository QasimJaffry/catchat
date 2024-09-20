import React from "react";

function Chat({ message }) {
  return (
    <div className="p-4 flex gap-2 items-end">
      <img
        src="/man.png"
        className="object-cover h-12 w-12 rounded-full "
        alt=""
      />
      <div className="w-[70%] flex flex-col items-end gap-1">
        <div className="bg-lightGray7 text-black rounded-tl-lg rounded-tr-lg rounded-br-lg p-2 text-sm border border-dark border-opacity-10">
          {message}
        </div>
        <span className="text-xs ">12:45 pm</span>
      </div>
    </div>
  );
}

export default Chat;
