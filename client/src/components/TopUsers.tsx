import { useEffect, useState } from "react";
import { GenerateAvatar, truncateAddress, generateUsername } from "../helperFunctions";
import { UserDetailsDefaultValues, UserDetailsType } from "../utils/helper";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";
type TopUsersType = {
  user: UserDetailsType;
};

import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";

const TopUsers = ({ user }: TopUsersType) => {
  const [currentUserDetails, setCurrentUserDetails] = useState<UserDetailsType>(
    UserDetailsDefaultValues
  );

  const { writeContract } = useWriteContract();
  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };
  const { address: currentUserAddress } = useAccount();
  const { data: contractData } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getPublicUserDetails",
        args: [currentUserAddress],
      },
    ],
  });

  const handleFollowUnfollow = () => {
    if (
      user.userAddress &&
      currentUserDetails.following.includes(user.userAddress as `0x${string}`)
    ) {
      writeContract({
        ...DTAAA,
        functionName: "unfollowUser",
        args: [user.userAddress],
      });
    } else {
      writeContract({
        ...DTAAA,
        functionName: "followUser",
        args: [user.userAddress],
      });
    }
  };

  useEffect(() => {
    if (contractData && contractData[0].result) {
      const usrDetails = contractData[0].result as UserDetailsType;
      setCurrentUserDetails(usrDetails);
    }
  }, [contractData]);

  const generatedUsername = generateUsername(user.userAddress)
  return (
    <div className="flex items-center justify-between border-2 border-neutral-700 rounded-md gap-2 p-2 ">
      <div className="flex gap-2">
        <div>
          <GenerateAvatar userAddress={String(user.userAddress)} size={40} />
        </div>
        <div className="flex-1">
          <p className="whitespace-nowrap text-ellipsis overflow-hidden md:max-w-[150px]">
            {generatedUsername}
          </p>
          <p className="text-sm text-neutral-400 whitespace-nowrap text-ellipsis overflow-hidden md:max-w-[150px]">
            {truncateAddress(String(user.userAddress))}
          </p>
        </div>
      </div>
      <button
        onClick={() => handleFollowUnfollow()}
        className=" bg-white font-semibold text-black px-3 p-1 rounded-lg z-10"
      >
        {currentUserDetails.following.includes(
          user.userAddress as `0x${string}`
        ) ? (
          <>
            <p>Unfollow</p>
          </>
        ) : (
          <>
            <p>
              {currentUserDetails.following.includes(
                user.userAddress as `0x${string}`
              )
                ? "Following"
                : "Follow"}
            </p>
          </>
        )}
      </button>
    </div>
  );
};

export default TopUsers;
