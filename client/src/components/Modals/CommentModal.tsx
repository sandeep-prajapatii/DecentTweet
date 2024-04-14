import React from "react";
import { useState } from "react";
import cross from "../../assets/cross.svg";

import {
  GenerateAvatar,
  calculateTimeDifference,
  truncateAddress,
} from "../../helperFunctions";

type CommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onReply: (_replyMsg: string) => void;
  tweetIndex: number;
  authorAddress: string;
  authorName: string;
  timestamp: number;
  tweetMsg: string;
  userAddress?: `0x${string}`;
};

const CommentModal = ({
  isOpen,
  onClose,
  onReply,
  tweetIndex,
  authorAddress,
  authorName,
  timestamp,
  tweetMsg,
  userAddress,
}: CommentModalProps) => {
  const [userReply, setUserReply] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserReply(e.target.value);
  };

  return (
    <div
      onClick={onClose}
      className={` ${
        isOpen === false && "hidden"
      } flex justify-center  h-screen w-screen absolute top-0 left-0 bg-white bg-opacity-20`}
      key={tweetIndex}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-neutral-900 md:mt-12 mt-0  p-4 md:rounded-md rounded-none md:w-[550px] w-full h-full md:h-fit"
      >
        <button onClick={() => onClose()}>
          <img className="h-8 w-8" src={cross} alt="close" />
        </button>

        <div className="mt-4  flex h-full">
          <GenerateAvatar userAddress={String(authorAddress)} size={40} />

          <div className="flex flex-col ">
            <div className="flex  gap-2 items-center">
              {authorName !== "" && (
                <>
                  <p>{authorName}</p>
                  <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
                </>
              )}
              <p>{truncateAddress(authorAddress || "")}</p>
              <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
              <p className="text-neutral-500">
                {calculateTimeDifference(Number(timestamp))}
              </p>
            </div>

            <div className="mt-2 ">
              <p>{tweetMsg}</p>
            </div>

            <p className="mt-4 text-neutral-500">
              Replying to {" "}
              <span className="text-white"> 
                @{authorName === "" ? truncateAddress(authorAddress) : authorName}
              </span>
            </p>
          </div>
        </div>
        <div className="flex mt-4">
          <GenerateAvatar userAddress={String(userAddress)} size={40} />
          <textarea
            onChange={handleChange}
            placeholder="Place your reply"
            className=" bg-neutral-900 placeholder:text-lg placeholder:text-neutral-400 focus:outline-none w-full h-fit resize-none"
          />
        </div>

        <div className="flex justify-end w-full mt-4">
          <button
            onClick={() => {
              onReply(userReply);
              setUserReply("")
              onClose()
            }}
            className="bg-white text-black px-4 p-1 font-semibold rounded-md"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
