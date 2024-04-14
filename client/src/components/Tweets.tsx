import { useEffect, useState } from "react";
import { TweetData, TweetDataDefaultValue } from "../utils/helper";
import Tweet from "./Tweet";
import { useReadContract } from "wagmi";
import {
  DecentTweetContractAddress as address,
  DecentTweetAbi as abi,
} from "../contract/DecentTweetABI";

type TweetsProp = {
  tweetData: TweetData[];
  tweetIndices?: number[];
};
const Tweets = ({ tweetData, tweetIndices }: TweetsProp) => {
  const [tweetsArray, setTweetsArray] = useState<TweetData[]>([
    TweetDataDefaultValue,
  ]);

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  const { data } = useReadContract({
    ...DTAAA,
    functionName: "getTweetsByIndices",
    args: [tweetIndices],
  });

  console.log(data);

  useEffect(() => {
    if (tweetIndices && tweetIndices.length > 0 && data) {
      const tweets = data as TweetData[];
      setTweetsArray(tweets);
    }
    console.log("THis is data ", data);
  }, [data, tweetIndices]);

  return (
    <>
      {tweetIndices && tweetIndices.length > 0 ? (
        <>
          <div className="divide-y divide-opacity-80 divide-neutral-700">
            {tweetsArray.map((tweet) => {
              return (
                <>
                  <Tweet
                    authorAddress={tweet.authorAddress}
                    authorName={tweet.authorName}
                    timestamp={tweet.timestamp}
                    tweetMsg={tweet.tweetMsg}
                    tweetIndex={tweet.tweetIndex}
                    likedBy={tweet.likedBy}
                    replies={tweet.replies}
                    quotedTweetIndex={tweet.quotedTweetIndex}
                    quotes={tweet.quotes}
                    retweets={tweet.retweets}
                    tweetType={tweet.tweetType}
                    bookmarks={tweet.bookmarks}
                    repliedTweetIndex={tweet.repliedTweetIndex}
                  />
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="divide-y-2">
            {tweetData.map((tweet) => {
              return (
                <>
                  <Tweet
                    authorAddress={tweet.authorAddress}
                    authorName={tweet.authorName}
                    timestamp={tweet.timestamp}
                    tweetMsg={tweet.tweetMsg}
                    tweetIndex={tweet.tweetIndex}
                    likedBy={tweet.likedBy}
                    replies={tweet.replies}
                    quotedTweetIndex={tweet.quotedTweetIndex}
                    quotes={tweet.quotes}
                    retweets={tweet.retweets}
                    tweetType={tweet.tweetType}
                    bookmarks={tweet.bookmarks}
                    repliedTweetIndex={tweet.repliedTweetIndex}
                  />
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Tweets;
