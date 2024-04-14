import { useAccount, useReadContracts } from "wagmi";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";
import { useEffect, useState } from "react";
import {
  TweetData,
  TweetDataDefaultValue,
  UserDetailsType,
} from "../utils/helper";
import Tweets from "../components/Tweets";

const Bookmarks = () => {
  const { address: userAddress } = useAccount();
  const [indexOfBookMarkedTweets, setIndexOfBookMarkedTweets] = useState<
    number[]
  >([]);
  const [bookmarkedTweetsArray, setBookmarkedTweetsArray] = useState<
    TweetData[]
  >([TweetDataDefaultValue]);

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  const { data } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getPublicUserDetails",
        args: [userAddress],
      },
      {
        ...DTAAA,
        functionName: "getTweetsByIndices",
        args: [indexOfBookMarkedTweets],
      },
    ],
  });

  useEffect(() => {
    if (data && data[0].result) {
      const userDetails = data[0].result as UserDetailsType;
      setIndexOfBookMarkedTweets(userDetails.bookmarks);
    }
  }, [data]);

  useEffect(() => {
    if (data && data[1].result) {
      const bookmarkedTweets = data[1].result as TweetData[];
      setBookmarkedTweetsArray(bookmarkedTweets);
    }
  }, [data]);

  console.log(indexOfBookMarkedTweets);
  console.log(bookmarkedTweetsArray);
  return (
    <div>
      <p className="text-xl font-bold text-center p-2 border-b-2 border-neutral-700">
        Bookmarks
      </p>

      <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
        {bookmarkedTweetsArray.length === 0 ? (
          "You havent bookmarked anything"
        ) : (
          <Tweets tweetData={bookmarkedTweetsArray} />
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
