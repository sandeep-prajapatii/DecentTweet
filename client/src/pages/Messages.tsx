import React from "react";
import Search from "../components/Search";
import MessageLog from "../components/MessageLog";
import PersonalMessage from "../components/PersonalMessage";

const Messages = () => {
  return (
    <div>
      <p className="text-xl font-bold text-center p-2 border-b-2 border-neutral-700">
        Messages
      </p>
      <div className="px-2">
        <Search />
      </div>
      {/* <div className="flex flex-col gap-2">
        <MessageLog />
        <MessageLog />
        <MessageLog />
      </div> */}
      <PersonalMessage />
    </div>
  );
};

export default Messages;
