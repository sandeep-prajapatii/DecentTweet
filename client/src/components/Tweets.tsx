import { TweetData } from "../utils/helper";
import Tweet from "./Tweet";

type TweetsProp = {
  tweetData: TweetData[];
  tweetIndices?: number[];
};
const Tweets = ({ tweetData }: TweetsProp) => {
  // const [tweetIndices, setTweetIndices] = useState(); // according to the indexed fetch and map it below

  // const { data, status } = useReadContract({
  //   abi,
  //   address: address as `0x${string}`,
  //   functionName: "getAllTweets",
  // });

  return (
    <div>
      {tweetData.map((tweet) => {
        return (
          <>
            <Tweet
              authorAddress={tweet.authorAddress}
              authorName=""
              timestamp={tweet.timestamp}
              tweetMsg={tweet.tweetMsg}
              tweetIndex={tweet.tweetIndex}
              likedBy={tweet.likedBy}
              replies={tweet.replies}
              quotedTweetIndex={tweet.quotedTweetIndex}
              quotes={tweet.quotes}
              retweets={tweet.retweets}
              tweetType={tweet.tweetType}
            />
          </>
        );
      })}
    </div>
  );
};

export default Tweets;
