import React, { useState } from "react";
import ConnectionsProfile from "../components/ConnectionsProfile";
import { useReadContracts } from "wagmi";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";


const Connections = () => {
  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };
  const { data } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getFollowers",
        args: ["0xd98283F591150291e92e46a997dda3090a982A44"],
      },
      {
        ...DTAAA,
        functionName: "getFollowing",
        args: ["0xd98283F591150291e92e46a997dda3090a982A44"],
      },
    ],
  });
  console.log(data  )

  const [selectedTab, setSelectedTab] = useState("followers");
  return (
    <div>
      <div className="flex border-b-2 border-neutral-700">
        <div
          className="w-full flex justify-center"
          onClick={() => setSelectedTab("followers")}
        >
          <button
            className={`p-2 ${
              selectedTab === "followers" && "border-b-4 border-blue-600"
            }`}
          >
            Followers
          </button>
        </div>
        <div
          className="w-full flex justify-center"
          onClick={() => setSelectedTab("followings")}
        >
          <button
            className={`p-2 ${
              selectedTab === "followings" && "border-b-4 border-blue-600"
            }`}
          >
            Following
          </button>
        </div>
      </div>

      <div>
        <ConnectionsProfile />
        <ConnectionsProfile />
      </div>
    </div>
  );
};

export default Connections;
