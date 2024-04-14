import { useEffect, useState } from "react";
import ConnectionsProfile from "../components/ConnectionsProfile";
import { useReadContracts } from "wagmi";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";
import { useLocation } from "react-router-dom";

const Connections = () => {
  const [followerList, setFollowerList] = useState<string[]>([]);
  const [followingList, setFollowingList] = useState<string[]>([]);

  const location = useLocation();
  const locationState = location.state;

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };
  const { data: contractData } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getFollowers",
        args: [locationState.userAddress],
      },
      {
        ...DTAAA,
        functionName: "getFollowing",
        args: [locationState.userAddress],
      },
    ],
  });

  useEffect(() => {
    if (contractData && contractData[0].result) {
      const listOfFollowers = contractData[0].result as string[];
      setFollowerList(listOfFollowers);
    }
    if (contractData && contractData[1].result) {
      const listOfFollowing = contractData[1].result as string[];
      setFollowingList(listOfFollowing);
    }
  }, [contractData]);

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
        {selectedTab === "followings" ? (
          <>
            {followingList.map((follower) => {
              return (
                <>
                  <ConnectionsProfile usrAddress={follower} />;
                </>
              );
            })}
          </>
        ) : (
          <>
            {followerList.map((follower) => {
              return (
                <>
                  <ConnectionsProfile usrAddress={follower} />
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Connections;
