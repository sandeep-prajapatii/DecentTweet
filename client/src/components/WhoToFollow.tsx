import { useEffect, useState } from "react";
import { useReadContracts } from "wagmi";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";
import { UserDetailsType } from "../utils/helper";
import TopUsers from "./TopUsers";

const WhoToFollow = () => {
  const [topUsers, setTopUsers] = useState<UserDetailsType[]>([]);

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  const { data: contractData } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getTopUsers",
        args: [2],
      },
    ],
  });

  useEffect(() => {
    if (contractData && contractData[0].result) {
      const topUsrs = contractData[0].result as UserDetailsType[];
      setTopUsers(topUsrs);
    }
  }, [contractData]);
  return (
    <div className="border-2 rounded-md border-neutral-700 p-2">
      <p className="text-xl font-semibold mb-4">Who to follow</p>
      <div className="flex flex-col gap-4">
        {topUsers.map((user) => {
          return (
            <>
              <TopUsers user={user} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default WhoToFollow;
