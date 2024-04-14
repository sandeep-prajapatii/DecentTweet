import { useNavigate } from "react-router-dom";

import {
  GenerateAvatar,
  calculateTimeDifference,
  truncateAddress,
} from "../helperFunctions";
import { TweetDataDefaultValue, TweetData, ReplyType } from "../utils/helper";
import { useEffect, useState } from "react";
import { useReadContracts } from "wagmi";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";

const Reply = ({ originalTweet, replyTweet }: ReplyType) => {
  console.log(originalTweet, replyTweet);

  const navigate = useNavigate();
  const [originalTweetData, setOriginalTweetData] = useState<TweetData>(
    TweetDataDefaultValue
  );

  const [currentTweetData, setCurrentTweetData] = useState<TweetData>(
    TweetDataDefaultValue
  );

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  const { data } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getTweetByIndex",
        args: [originalTweet],
      },
      {
        ...DTAAA,
        functionName: "getTweetByIndex",
        args: [replyTweet],
      },
    ],
  });

  useEffect(() => {
    if (data && data[0].result) {
      const tweetData = data[0].result as TweetData;
      setOriginalTweetData(tweetData);
    }
    if (data && data[1].result) {
      const tweetData = data[1].result as TweetData;
      setCurrentTweetData(tweetData);
    }
  }, [data]);

  return (
    <>
      <div className="border-2 border-neutral-700  rounded-md">
        <div className=" p-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 object-contain">
              <GenerateAvatar
                userAddress={originalTweetData.authorAddress}
                size={40}
              />
            </div>
            <div className="flex items-center gap-2">
              {originalTweetData.authorName !== "" && (
                <>
                  <p>{originalTweetData.authorName}</p>
                  <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
                </>
              )}
              <p>{truncateAddress(originalTweetData.authorAddress)}</p>
              <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
              <p className="text-neutral-500">
                {calculateTimeDifference(Number(originalTweetData.timestamp))}
              </p>
            </div>
          </div>
          <p className="mt-2">{originalTweetData.tweetMsg}</p>
        </div>
      </div>

      <div className="mx-auto w-[90%]">
        <div
          onClick={() => navigate(`/profile/${currentTweetData.authorAddress}`)}
          className="flex items-center gap-2 mb-2  "
        >
          <div className="h-10 w-10 object-contain">
            <GenerateAvatar
              userAddress={currentTweetData.authorAddress}
              size={40}
            />
          </div>
          <div className="flex items-center gap-2">
            {currentTweetData.authorName !== "" && (
              <>
                <p>{currentTweetData.authorName}</p>
                <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
              </>
            )}
            <p>{truncateAddress(currentTweetData.authorAddress || "")}</p>
            <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
            <p className="text-neutral-500">
              {calculateTimeDifference(Number(currentTweetData.timestamp))}
            </p>
          </div>
        </div>
        <p
          onClick={() => navigate(`/tweet/${currentTweetData.tweetIndex}`)}
          className="mb-2"
        >
          {currentTweetData.tweetMsg}
        </p>
      </div>
    </>
  );
};

export default Reply;
