import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import cross from "../../assets/cross.svg";
import {
  GenerateAvatar,
  calculateTimeDifference,
  truncateAddress,
} from "../../helperFunctions";
import { useEffect, useState } from "react";

import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../../contract/DecentTweetABI";
import { TweetData, TweetDataDefaultValue } from "../../utils/helper";

type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isQuotable: boolean;
  originalTweetIndex: number;
};

const PostModal = ({
  onClose,
  isOpen,
  isQuotable,
  originalTweetIndex,
}: PostModalProps) => {
  const [tweetMessage, setTweetMessage] = useState<string>("");
  const [originalTweetData, setOriginalTweetData] = useState<TweetData>(
    TweetDataDefaultValue
  );

  const { address: userAddress } = useAccount();
  const { writeContract } = useWriteContract();

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  const { data: contractData } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getTweetByIndex",
        args: [originalTweetIndex],
      },
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const tweetMsg = e.target.value;
    setTweetMessage(tweetMsg);
  };

  const handlePost = () => {
    if (isQuotable === true) {
      writeContract({
        ...DTAAA,
        functionName: "quoteTweet",
        args: [originalTweetIndex, tweetMessage],
      });
    } else {
      writeContract({
        ...DTAAA,
        functionName: "createTweet",
        args: [tweetMessage],
      });
    }
  };

  useEffect(() => {
    if (contractData && contractData[0].result) {
      const tweetData = contractData[0].result as TweetData;
      setOriginalTweetData(tweetData);
    }
  }, [contractData]);

  return (
    <div
      onClick={onClose}
      className={` ${
        isOpen === false && "hidden"
      } flex justify-center  h-screen w-screen fixed top-0 left-0 bg-white bg-opacity-20 `}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-neutral-900 md:mt-12 mt-0  p-4 md:rounded-md rounded-none md:w-[550px] w-full h-full md:h-fit z-50"
      >
        <button onClick={() => onClose()}>
          <img className="h-8 w-8" src={cross} alt="close" />
        </button>

        <div className="mt-4  flex h-full">
          <GenerateAvatar userAddress={String(userAddress)} size={40} />

          <textarea
            onChange={handleChange}
            placeholder="What is happening"
            className=" bg-neutral-900 placeholder:text-lg placeholder:text-neutral-400 focus:outline-none w-full h-fit resize-none"
          />
        </div>
        {isQuotable === true && (
          <div className="border-2 border-neutral-700 mx-auto w-[90%] rounded-md">
            <div className=" p-2">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 object-contain">
                  <GenerateAvatar
                    userAddress={originalTweetData.authorAddress}
                    size={40}
                  />
                </div>
                <div className="flex items-center gap-2">
                  {originalTweetData.authorName !== "" && (
                    <>
                      <p>{originalTweetData.authorName}</p>
                      <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
                    </>
                  )}
                  <p>{truncateAddress(originalTweetData.authorAddress)}</p>
                  <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
                  <p className="text-neutral-500">
                    {calculateTimeDifference(
                      Number(originalTweetData.timestamp)
                    )}
                  </p>
                </div>
              </div>
              <p className="mt-2">{originalTweetData.tweetMsg}</p>
            </div>
          </div>
        )}

        <div className="flex justify-end w-full mt-4">
          <button
            onClick={() => handlePost()}
            className="bg-white text-black px-4 p-1 font-semibold rounded-md"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
