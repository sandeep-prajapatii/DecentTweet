import { useNavigate } from "react-router-dom";

import {
  GenerateAvatar,
  calculateTimeDifference,
  truncateAddress,
} from "../helperFunctions";
import {
  RetweetType,
  TweetDataDefaultValue,
  TweetData,
  UserDetailsDefaultValues,
  UserDetailsType,
} from "../utils/helper";
import { useEffect, useState } from "react";
import { useReadContracts } from "wagmi";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";
import repostIcon from "../assets/icons/tweet/repost.svg";

const ReTweet = ({ originalTweet, retweetedBy }: RetweetType) => {
  const navigate = useNavigate();

  const [originalTweetData, setOriginalTweetData] = useState<TweetData>(
    TweetDataDefaultValue
  );

  const [userDetails, setUserDetails] = useState<UserDetailsType>(
    UserDetailsDefaultValues
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
        functionName: "getPublicUserDetails",
        args: [retweetedBy],
      },
    ],
  });

  useEffect(() => {
    if (data && data[0].result) {
      const tweetData = data[0].result as TweetData;
      setOriginalTweetData(tweetData);
    }

    if (data && data[1].result) {
      const result = data[1].result as UserDetailsType;
      setUserDetails({
        userAddress: result.userAddress,
        userName: result.userName,
        userBio: result.userBio,
        bookmarks: result.bookmarks,
        posts: result.posts,
        likes: result.likes,
        replies: result.replies,
        followers: result.followers,
        following: result.following,
      });
    }
  }, [data]);

  return (
    <>
      <div className="flex gap-1 m-1">
        <img src={repostIcon} className="h-4" />
        <p className="text-sm flex justify-center items-center gap-2 text-neutral-400 font-semibold">
          {userDetails.userName !== "" && (
            <>
              <p>{userDetails.userName}</p>
              <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
            </>
          )}
          {truncateAddress(userDetails.userAddress)} reposted
        </p>
      </div>

      <div
        onClick={() => navigate(`/profile/${originalTweetData.authorAddress}`)}
        className="flex items-center gap-2 mb-2 "
      >
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
          <p>{truncateAddress(originalTweetData.authorAddress || "")}</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className="text-neutral-500">
            {calculateTimeDifference(Number(originalTweetData.timestamp))}
          </p>
        </div>
      </div>
      <p
        onClick={() => navigate(`/tweet/${originalTweetData.tweetIndex}`)}
        className="mb-2"
      >
        {originalTweetData.tweetMsg}
      </p>
    </>
  );
};

export default ReTweet;
