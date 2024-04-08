import React, { useEffect, useState } from "react";
import CreateTweet from "../components/CreateTweet";
import Tweet from "../components/Tweet";
import { useReadContract } from "wagmi";
import { DecentTweetAbi } from "../contract/DecentTweetABI";

interface TweetData {
  author: string;
  timestamp: bigint;
  text: string;
}

const Home = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const result = useReadContract({
    abi: DecentTweetAbi,
    address: "0xf2936B08700c37968b1A2FB0f7B832480147874f",
    functionName: "getAllTweets",
  });

  useEffect(() => {
    if (result?.data && Array.isArray(result.data)) {
      const tweetData: TweetData[] = result.data;
      setTweets(tweetData);
    }
  }, [result]);

  return (
    <div>
      <div className="w-full">
        <button className="w-1/2 p-2">For you</button>
        <button className="w-1/2 p-2">Following</button>
      </div>
      <CreateTweet />
      <div className="p-2 flex flex-col gap-2">
        {tweets.map((tweet, index) => (
          <Tweet
            key={index}
            address={tweet.author}
            timestamp={Number(tweet.timestamp)}
            content={tweet.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;