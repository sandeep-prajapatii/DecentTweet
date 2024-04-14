import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { DecentTweetAbi } from "../../contract/DecentTweetABI";
import { useEffect, useState } from "react";

import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../../contract/DecentTweetABI";
import { TweetData } from "../../utils/helper";
import Tweets from "../Tweets";

const FollowingFeed = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [followingList, setFollowingList] = useState<string[]>([]);
  const [followingTweetIndices, setFollowingTweetIndices] = useState<number[]>(
    []
  );
  const { address: currentUserAddress } = useAccount();

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };
  const { data: contractData } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getFollowers",
        args: [currentUserAddress],
      },
    ],
  });

  useEffect(() => {
    if (contractData && contractData[0].result) {
      const listOfFollowers = contractData[0].result as string[];
      setFollowingList(listOfFollowers);
    }
  }, [contractData]);

  return (
    <div className="p-2 flex flex-col gap-2">
      {tweets.length === 0 ? (
        <>
          <p className="text-xl font-semibold text-center mt-6">
            Your followers haven't posted yet :({" "}
          </p>
        </>
      ) : (
        <>
          <Tweets tweetData={tweets} />
        </>
      )}
    </div>
  );
};

export default FollowingFeed;
