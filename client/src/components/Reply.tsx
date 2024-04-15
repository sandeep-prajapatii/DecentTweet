import { useLocation, useNavigate } from "react-router-dom";
import {
  GenerateAvatar,
  calculateTimeDifference,
  truncateAddress,
  generateUsername,
} from "../helperFunctions";
import { TweetDataDefaultValue, TweetData, ReplyType } from "../utils/helper";
import { useEffect, useState } from "react";
import { useReadContracts } from "wagmi";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";

const Reply = ({ originalTweet, replyTweet }: ReplyType) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const [isOriginalTweetVisible, setIsOriginalTweetVisible] = useState(true);
  const navigate = useNavigate();
  const [originalTweetData, setOriginalTweetData] = useState<TweetData>(
    TweetDataDefaultValue
  );
  const generatedOriginalUsername = generateUsername(
    originalTweetData.authorAddress
  );
  const [currentTweetData, setCurrentTweetData] = useState<TweetData>(
    TweetDataDefaultValue
  );
  const generatedCurrentUsername = generateUsername(
    currentTweetData.authorAddress
  );

  const DTAAA = { address: address as `0x${string}`, abi };
  const { data } = useReadContracts({
    contracts: [
      { ...DTAAA, functionName: "getTweetByIndex", args: [originalTweet] },
      { ...DTAAA, functionName: "getTweetByIndex", args: [replyTweet] },
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

  useEffect(() => {
    if (currentLocation.includes(`/tweet/${originalTweet}`)) {
      setIsOriginalTweetVisible(true);
    } else {
      setIsOriginalTweetVisible(false);
    }
  }, [currentLocation, originalTweet]);

  return (
    <div className="relative">
      {isOriginalTweetVisible === false && (
        <div className="flex z-50 relative">
          <div className="m-1">
            <GenerateAvatar
              userAddress={originalTweetData.authorAddress}
              size={40}
            />
          </div>
          <div className="gap-2">
            <div className="flex items-center gap-2">
              <p>
                {originalTweetData.authorName !== ""
                  ? generatedOriginalUsername
                  : originalTweetData.authorName}
              </p>

              <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
              <p>{truncateAddress(originalTweetData.authorAddress)}</p>
              <span className="h-1 w-1 bg-neutral-400 rounded-full"></span>
              <p className="text-neutral-500">
                {calculateTimeDifference(Number(originalTweetData.timestamp))}
              </p>
            </div>
            <p
              onClick={() => navigate(`/tweet/${originalTweetData.tweetIndex}`)}
              className="mt-2"
            >
              {originalTweetData.tweetMsg}
            </p>
          </div>
        </div>
      )}
      <span className="absolute h-[70%]  border border-neutral-700 top-1/2 -translate-y-1/2 left-[22px] "></span>
      <div
        onClick={() => navigate(`/profile/${currentTweetData.authorAddress}`)}
        className="flex z-50 mt-2  relative"
      >
        <div className="m-1">
          <GenerateAvatar
            userAddress={currentTweetData.authorAddress}
            size={40}
          />
        </div>
        <div className=" gap-2">
          <div className="flex items-center gap-2">
            <p>
              {currentTweetData.authorName !== ""
                ? generatedCurrentUsername
                : currentTweetData.authorName}
            </p>

            <p>{truncateAddress(currentTweetData.authorAddress || "")}</p>
            <span className="h-1 w-1 bg-neutral-400 rounded-full"></span>
            <p className="text-neutral-500 ">
              {calculateTimeDifference(Number(currentTweetData.timestamp))}
            </p>
          </div>
          <p
            onClick={() => navigate(`/tweet/${currentTweetData.tweetIndex}`)}
            className="mt-2"
          >
            {currentTweetData.tweetMsg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
