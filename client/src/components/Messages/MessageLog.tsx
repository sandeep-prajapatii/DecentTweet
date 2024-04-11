import React from "react";
import { GenerateAvatar, truncateAddress } from "../../helperFunctions";
import { useNavigate } from "react-router-dom";

interface MessageLogProps {
  username: string;
  address: string;
  timestamp: string;
  content: string;
}

const MessageLog: React.FC<MessageLogProps> = ({
  username,
  address,
  timestamp,
  content
}) => {
  const shortUserAddress = truncateAddress(address);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/personal-msg", { state: { address: address } });
  };

  return (
    <div
      onClick={() => handleClick()}
      className="flex gap-2 items-center border-2 border-neutral-700 p-2 mx-2 rounded-md"
    >
      <GenerateAvatar userAddress={address} size={40} />
      <div className="w-full">
        <div className="flex-grow flex items-center gap-2">
          <p className="font-semibold">{username}</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className=" text-neutral-500 text-sm">{shortUserAddress}</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className="text-neutral-500 text-sm">{timestamp}</p>
        </div>
        <div>
          <p className="h-6 overflow-hidden">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageLog;
