import CreateTweet from "../components/CreateTweet";
import ForYouFeed from "../components/ForYouFeed";
import FollowingFeed from "../components/FollowingFeed";
import { useState } from "react";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("foryou");

  return (
    <div>
      <div className="w-full divide-x-2">
        <button
          onClick={() => {
            setSelectedTab("foryou");
          }}
          className={`w-1/2 text-xl font-semibold text-center p-2 border-b-2 border-neutral-700 ${selectedTab == "foryou" && "border-b-4"}`}
        >
          For you
        </button>
        <button
          onClick={() => {
            setSelectedTab("following");
          }}  
          className={`w-1/2 text-xl font-semibold text-center p-2 border-b-2 border-neutral-700 ${selectedTab == "following" && "border-b-4"}`}
        >
          Following
        </button>
      </div>
      <CreateTweet />

      {selectedTab == "foryou" ? <ForYouFeed /> : <FollowingFeed />}
    </div>
  );
};

export default Home;
