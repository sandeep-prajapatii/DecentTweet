import React from "react";
import CreateTweet from "../components/CreateTweet";
import Tweet from "../components/Tweet";

const Home = () => {
  return (
    <div>
      <div className="w-full">
        <button className="w-1/2">For you</button>
        <button className="w-1/2">Following</button>
      </div>
      <CreateTweet />
      <div className="p-2 flex flex-col gap-2">
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
      </div>
    </div>
  );
};

export default Home;
