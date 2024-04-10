import React from "react";
import { GenerateAvatar, truncateAddress } from "../helperFunctions";

const MessageLog = () => {
  const userAddress = "0x910373992d054eF318081c111cF4C87B44aBa869";
  const shortUserAddress = truncateAddress(userAddress);

  return (
    <div className="flex gap-2 items-center border-2 border-neutral-700 p-2 mx-2 rounded-md">
      <GenerateAvatar userAddress={userAddress} size={40} />
      <div className="w-full">
        <div className="flex-grow flex items-center gap-2">
          <p className="font-semibold">username</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className=" text-neutral-500 text-sm">{shortUserAddress}</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className="text-neutral-500 text-sm">5h ago</p>
        </div>
        <div>
          <p className="h-6 overflow-hidden">
            HELLO SIR MY NAME IS SANDEEP PRAJAPATI I LIVE IN TULSHETPASDA
            PIPELINE BHANDUP BHAENKI CHUT
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageLog;
