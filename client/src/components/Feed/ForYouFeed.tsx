import React, { useEffect, useState } from "react";
import Tweet from "../Tweet";
import { useReadContract } from "wagmi";
import { DecentTweetAbi } from "../../contract/DecentTweetABI";
import { useAccount } from "wagmi";

interface TweetData {
  author: string;
  timestamp: bigint;
  tweetMsg: string;
  tweetIndex: number;
  likes: string[];
  replyIndices: number[];
}

const ForYouFeed = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const account = useAccount();
  const userAddress: string = account?.address?.toString() || "";

  const result = useReadContract({
    abi: DecentTweetAbi,
    address: "0xd0b4e9222bf56dfffa5d0e7a8f317da5a262c43c",
    functionName: "getAllTweets",
  });

  console.log(result);

  useEffect(() => {
    if (result?.data && Array.isArray(result.data)) {
      const tweetData: TweetData[] = result.data;
      setTweets(tweetData);
    }
  }, [result]);

  return (
    <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
      {tweets
        .slice()
        .reverse()
        .map((tweet, index) => (
          <Tweet
            key={index}
            index={tweet.tweetIndex}
            address={tweet.author}
            timestamp={Number(tweet.timestamp)}
            content={tweet.tweetMsg}
            currentUserAddress={userAddress}
            likes={tweet.likes.length}
            replyIndices={tweet.replyIndices.length}
          />
        ))}
    </div>
  );
};

export default ForYouFeed;
