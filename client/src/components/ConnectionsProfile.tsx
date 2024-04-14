import { useEffect, useState } from "react";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";
import { GenerateAvatar, truncateAddress } from "../helperFunctions";
import { UserDetailsDefaultValues, UserDetailsType } from "../utils/helper";

type ConnectionsProfileType = {
  usrAddress: string;
};

const ConnectionsProfile = ({ usrAddress }: ConnectionsProfileType) => {
  const [userDetials, setUserDetials] = useState<UserDetailsType>(
    UserDetailsDefaultValues
  );
  const [currentUserDetails, setCurrentUserDetails] = useState<UserDetailsType>(
    UserDetailsDefaultValues
  );
  const { address: currentUserAddress } = useAccount();

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  const { writeContract } = useWriteContract();

  const { data: contractData } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getPublicUserDetails",
        args: [usrAddress],
      },
      {
        ...DTAAA,
        functionName: "getPublicUserDetails",
        args: [currentUserAddress],
      },
    ],
  });

  const handleFollowUnfollow = () => {
    if (
      usrAddress &&
      currentUserDetails.following.includes(usrAddress as `0x${string}`)
    ) {
      writeContract({
        ...DTAAA,
        functionName: "unfollowUser",
        args: [usrAddress],
      });
    } else {
      writeContract({
        ...DTAAA,
        functionName: "followUser",
        args: [usrAddress],
      });
    }
  };

  useEffect(() => {
    if (contractData && contractData[0].result) {
      const usrDetails = contractData[0].result as UserDetailsType;
      setUserDetials(usrDetails);
    }
    if (contractData && contractData[1].result) {
      const usrDetails = contractData[1].result as UserDetailsType;
      setCurrentUserDetails(usrDetails);
    }
  }, [contractData]);

  console.log(userDetials);
  return (
    <div className="flex p-2 py-4 border-b border-neutral-700">
      <GenerateAvatar userAddress={String(usrAddress)} size={40} />
      <div className="w-full">
        <div className="flex">
          <div className="flex-grow">
            <p>{userDetials.userName}</p>
            <p className="text-sm text-neutral-500">
              {truncateAddress(String(userDetials.userAddress))}
            </p>
          </div>

          <button
            onClick={() => handleFollowUnfollow()}
            className="bg-white p-1 px-3 text-black font-semibold rounded-md  h-fit"
          >
            {currentUserDetails.following.includes(
              usrAddress as `0x${string}`
            ) ? (
              <>
                <p>Unfollow</p>
              </>
            ) : (
              <>
                <p>
                  {currentUserDetails.following.includes(
                    usrAddress as `0x${string}`
                  )
                    ? "Following"
                    : "Follow"}
                </p>
              </>
            )}
          </button>
        </div>
        <p>{userDetials.userBio}</p>
      </div>
    </div>
  );
};

export default ConnectionsProfile;
