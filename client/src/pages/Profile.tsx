import { useAccount } from "wagmi";
import { GenerateAvatar } from "../helperFunctions";
import PostDashboard from "../components/Dashboard/PostDashboard";
import RepliesDashboard from "../components/Dashboard/RepliesDashboard";
import LikesDashboard from "../components/Dashboard/LikesDashboard";
import { useState } from "react";

const Profile = () => {
  const account = useAccount();
  const userAddress: string = account?.address?.toString() || "";

  const [selectedTab, setSelectedTab] = useState("Post");

  // const handleDashboardClick = () =>{

  // }

  return (
    <div className="flex flex-col h-full">
      <p className="text-xl font-bold text-center p-2 border-b-2 border-neutral-700">
        Profile
      </p>
      <div className="flex justify-center mt-4">
        {userAddress && <GenerateAvatar userAddress={userAddress} size={150} />}
      </div>

      <div className="mx-4 mt-4">
        <p className="text-xl font-bold">Sandeep Prajapati</p>
        <p className="text-neutral-400 ">{userAddress}</p>
        <p className="mt-4">
          Hello my name is sandeep prajapati and this is my bio okay bitch fa
          sdfa dfa sdf asd fa sdf as fas df a f fuck u
        </p>
      </div>

      <div className="flex mx-4 mt-4 gap-4">
        <p className="text-neutral-400 ">
          <span className="text-white font-semibold">84</span> Followers
        </p>
        <p className="text-neutral-400 ">
          <span className="text-white font-semibold">84</span> Following
        </p>
      </div>
      <button className="bg-white text-black font-semibold p-1 px-3 rounded-md mt-4 mx-auto block">
        Follow
      </button>

      <div className="mt-4 flex flex-col flex-grow">
        <div className="flex  border-b border-neutral-700">
          <div className="w-full" onClick={() => setSelectedTab("Post")}>
            <button className={`mx-auto block px-4 py-2 ${selectedTab === "Post" && "border-b-4"}`}>Post</button>
          </div>
          <div className="w-full" onClick={() => setSelectedTab("Replies")}>
            <button className={`mx-auto block px-4 py-2 ${selectedTab === "Replies" && "border-b-4"}`}>Replies</button>
          </div>
          <div className="w-full" onClick={() => setSelectedTab("Likes")}>
            <button className={`mx-auto block px-4 py-2 ${selectedTab === "Likes" && "border-b-4"}`}>Likes</button>
          </div>
        </div>
        <div className="flex-grow ">
          {selectedTab === "Post" && <PostDashboard />}
          {selectedTab === "Replies" && <RepliesDashboard />}
          {selectedTab === "Likes" && <LikesDashboard />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
