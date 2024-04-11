import React, { useEffect, useState } from "react";
import Tweet from "../Tweet";
import { useReadContract } from "wagmi";
import { DecentTweetAbi } from "../../contract/DecentTweetABI";
import { useAccount } from "wagmi";
import Repost from "../Repost";
import Quote from "../Quote";

interface TweetData {
  author: string;
  timestamp: bigint;
  tweetMsg: string;
  tweetIndex: number;
  likes: string[];
  replyIndices: number[];
}

const ForYouFeed = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const account = useAccount();
  const userAddress: string = account?.address?.toString() || "";

  const result = useReadContract({
    abi: DecentTweetAbi,
    address: "0xd0b4e9222bf56dfffa5d0e7a8f317da5a262c43c",
    functionName: "getAllTweets",
  });

  console.log(result);

  useEffect(() => {
    if (result?.data && Array.isArray(result.data)) {
      const tweetData: TweetData[] = result.data;
      setTweets(tweetData);
    }
  }, [result]);

  return (
    <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
      <Tweet
        address={"0xd67253783AC49c61159182f2f20679338ED8627"}
        timestamp={1712303549}
        content="Anyone heard today's new ??"
        index={55}
        currentUserAddress=""
        likes={66}
        commentCount={30}
        replyIndices={6}
        quoted={false}
      />
      <Tweet
        address={"0xD1dA53783AC49c61159182f2f20679338ED852e7"}
        timestamp={1712303549}
        content="Metaverse seems super cool"
        index={55}
        currentUserAddress=""
        likes={5}
        commentCount={2}
        replyIndices={0}
        quoted={false}
      />
      <Tweet
        address={"0x746h33783AC49c61159182f2f20679338E3746e"}
        timestamp={1712303549}
        content="Do you guys know GTA5 is free on Epic games today"
        index={55}
        currentUserAddress=""
        likes={332}
        commentCount={98}
        replyIndices={34}
        quoted={false}
      />
      <Repost
        address={"0x5659373992d054eF318081c111cF4C87B44aBa432"}
        timestamp={1712814671}
        content="Kendrick lamar finally dropped his biggest album"
        index={55}
        currentUserAddress=""
        likes={54}
        commentCount={23}
        replyIndices={8}
        quoted={false}
        repostedBy={"sandeep"}
      />
      <Repost
        address={"0x910373992d054eF318081c111cF4C87B44aBa869"}
        timestamp={1712814671}
        content="21 years old girl, MP of New Zealand sang Haka in the parliament"
        index={55}
        currentUserAddress=""
        likes={4}
        commentCount={3}
        replyIndices={1}
        quoted={false}
        repostedBy={"shaktii"}
      />
      <Quote
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
      />
      <Repost
        address={"0x910373992d054eF318081c111cF4C87B44aBa869"}
        timestamp={1712814671}
        content="How pass college without studing ???"
        index={55}
        currentUserAddress=""
        likes={22}
        commentCount={13}
        replyIndices={3}
        quoted={false}
        repostedBy={"shaktii"}
      />
      <Tweet
        address={"0xD1dA53783AC49c61159182f2f20679338ED852e7"}
        timestamp={1712303549}
        content="I dont like working in IT, what are the other interesting fields"
        index={55}
        currentUserAddress=""
        likes={9}
        commentCount={3}
        replyIndices={1}
        quoted={false}
      />
      {/* {tweets
        .slice()
        .reverse()
        .map((tweet, index) => (
          <Tweet
            key={index}
            index={tweet.tweetIndex}
            address={tweet.author}
            timestamp={Number(tweet.timestamp)}
            content={tweet.tweetMsg}
            currentUserAddress={userAddress}
            likes={tweet.likes.length}
            replyIndices={tweet.replyIndices.length}
            quoted={false}
          />
        ))} */}
    </div>
  );
};

export default ForYouFeed;
