import React from "react";
import CreateTweet from "../components/CreateTweet";
import Tweet from "../components/Tweet";
import { useReadContract } from 'wagmi'
import { DecentTweetAbi } from "../contract/DecentTweetABI"; 

const Home = () => {
  const result = useReadContract({
    abi : DecentTweetAbi,
      address: "0xf2936B08700c37968b1A2FB0f7B832480147874f",
    functionName: 'getAllTweets',
  })
  const testingReadFunc = () => {
    console.log(result)
  } 

  return (
    <div>
      <div className="w-full">
        <button className="w-1/2 p-2">For you</button>
        <button className="w-1/2 p-2">Following</button>
      </div>
      <CreateTweet />
      <div className="p-2 flex flex-col gap-2">
        <Tweet />
        <button onClick={testingReadFunc}>read </button>
        {/* <Tweet />
        <Tweet />
        <Tweet /> */}
      </div>
    </div>
  );
};

export default Home;