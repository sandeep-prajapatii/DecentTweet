import React, { useEffect, useState } from "react";
import Tweet from "../Tweet";
import { useReadContract } from "wagmi";
import { DecentTweetAbi } from "../../contract/DecentTweetABI";

interface TweetData {
  author: string;
  timestamp: bigint;
  text: string;
}

const FollowingFeed = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const result = useReadContract({
    abi: DecentTweetAbi,
    address: "0xf2936B08700c37968b1A2FB0f7B832480147874f",
    functionName: "getAllTweets",
  });

  // just change the api here it will work fine

  useEffect(() => {
    if (result?.data && Array.isArray(result.data)) {
      const tweetData: TweetData[] = result.data;
      setTweets(tweetData);
    }
  }, [result]);

  return (
    <div className="p-2 flex flex-col gap-2">
      {/* {tweets.slice().reverse().map((tweet, index) => (
      <Tweet
        key={index}
        address={tweet.author}
        timestamp={Number(tweet.timestamp)}
        content={tweet.text}
      />
    ))} */}
      <p className="text-xl font-semibold text-center mt-6">
        Your followers haven't posted yet :({" "}
      </p>
    </div>
  );
};

export default FollowingFeed;
