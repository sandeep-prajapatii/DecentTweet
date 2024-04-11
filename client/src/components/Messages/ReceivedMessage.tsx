import React from "react";

interface ReceivedMessageProps{
    content: string;
    time: string;
}

const ReceivedMessage : React.FC<ReceivedMessageProps>  = ({content, time}) => {
  return (
    <div>
      <p className="bg-neutral-700 p-2 px-4 w-fit rounded-e-2xl rounded-tl-2xl rounded-bl-sm max-w-[80%]">
        {content}
      </p>
      <p className="text-xs text-neutral-400 mt-1">{time}</p>
    </div>
  );
};

export default ReceivedMessage;
