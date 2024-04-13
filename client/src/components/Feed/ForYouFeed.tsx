import { useEffect, useState } from "react";
import Tweet from "../Tweet";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../../contract/DecentTweetABI";
import { TweetData } from "../../utils/helper";
import Tweets from "../Tweets";

const ForYouFeed = () => {
  // const account = useAccount();
  // const userAddress: string = account?.address?.toString() || "";
  const [tweetData, setTweetData] = useState<TweetData[]>();

  const { data, status } = useReadContract({
    abi,
    address: address as `0x${string}`,
    functionName: "getAllTweets",
  });

  console.log(tweetData, status);
  useEffect(() => {
    if (data) {
      setTweetData(data as TweetData[]);
    }
  }, [data]);

  // useEffect(() => {
  //   if (result?.data && Array.isArray(result.data)) {
  //     const tweetData: TweetData[] = result.data;
  //     setTweets(tweetData);
  //   }
  // }, [result]);

  return (
    <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
      {/* <Tweet
        address={"0x910373992d054eF318081c111cF4C87B44aBa869"}
        timestamp={1712814671}
        content="21 years old girl, MP of New Zealand sang Haka in the parliament"
        index={55}
        currentUserAddress=""
        likes={4}
        commentCount={3}
        replyIndices={2}
        quoted={false}
        quotedTime={"2hours ago"}
        quotedAddress={"0xD1dA53783AC49c61159182f2f20679338ED852e7"}
        quotedContent={"She must be very brave"}
        quotedLikes={2}
        quotedCommentCount={1}
        quotedReplyIndices={1}
      /> */}
      <Tweets tweetData={tweetData || []} />
    </div>
  );
};

export default ForYouFeed;
