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
  const tweetsArray = tweetIndices
    ? tweetIndices.map((index) => tweetData.find((tweet) => tweet.tweetIndex === index) || TweetDataDefaultValue)
    : tweetData;

  return (
    <>
      <div>
        {[...tweetsArray].reverse().map((tweet, index) => (
          <Tweet
            key={index}
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
        ))}
      </div>
    </>
  );
};

export default Tweets;