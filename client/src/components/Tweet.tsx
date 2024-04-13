import { useEffect, useState } from "react";
import like from "../assets/icons/tweet/heart.svg";
import bookmark from "../assets/icons/tweet/bookmark.svg";
import comment from "../assets/icons/tweet/comment.svg";
import share from "../assets/icons/tweet/share.svg";
import repost from "../assets/icons/tweet/repost.svg";
import likePink from "../assets/icons/tweet/heartPink.svg";
import repostGreen from "../assets/icons/tweet/repostGreen.svg";

import bookmarkFilled from "../assets/icons/tweet/bookmark-filled.svg";
import close from "../assets/cross.svg";
import {
  GenerateAvatar,
  calculateTimeDifference,
  formatUnixTimestamp,
  truncateAddress,
} from "../helperFunctions";
import CommentModal from "./Modals/CommentModal";
import repostIcon from "../assets/icons/tweet/repost.svg";
import RepostModal from "./RepostModal";
import {
  QuotedTweetData,
  QuotedTweetDataDefaultValue,
  TweetData,
  TweetType,
} from "../utils/helper";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";

import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";

const Tweet = ({
  authorAddress,
  authorName,
  likedBy,
  quotedTweetIndex,
  quotes,
  replies,
  retweets,
  timestamp,
  tweetIndex,
  tweetMsg,
  tweetType,
}: TweetData) => {
  const [currentTweetType, setCurrentTweetType] = useState<TweetType>(
    TweetType.TWEET
  );
  const [quotedTweetData, setQuotedTweetData] = useState<QuotedTweetData>(
    QuotedTweetDataDefaultValue
  );

  const { data: hash, isSuccess, writeContract } = useWriteContract();
  const { address: userAddress } = useAccount();

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  // userName , quotedData , TweetDetails , 
  const { data } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getUserName",
        args: [authorAddress],
      },
      {
        ...DTAAA,
        functionName: "getTweetByIndex",
        args: [quotedTweetIndex],
      },
      {
        ...DTAAA,
        functionName: "getTweetByIndex",
        args: [tweetIndex],
      },
      
    ],
  });

 
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [isRepostModalOpen, setIsRepostModalOpen] = useState<boolean>(false);

  const [likedAddresses, setLikedAddress] = useState([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(true);
  const [reposted, setReposted] = useState(false);

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const closeRespostModal = () => {
    setIsRepostModalOpen(false);
  };

  const handleLike = () => {
    writeContract({
      ...DTAAA,
      functionName: "likeTweet",
      args: [tweetIndex],
    });
    if (isSuccess === true) setLiked(true);
  };
  console.log(data);

  useEffect(() => {
    if (data && data[2].result) {
      const result = data[2].result as any;
      setLikedAddress(result.likedBy);
    }
  }, [data]);

  // Setting the Quoted Tweet Data if any
  useEffect(() => {
    if (data && data[1].result && quotedTweetIndex > 0) {
      const result = data[1].result as any;
      setQuotedTweetData({
        authorAddress: result.authorAddress,
        authorName: result.authorName,
        timestamp: result.timestamp,
        tweetIndex: result.tweetIndex,
        tweetMsg: result.tweetMsg,
      });
    }
  }, [quotedTweetIndex, data]);

  // Seting the tweet Type
  useEffect(() => {
    if (tweetType === 3) {
      setCurrentTweetType(TweetType.QUOTE);
    } else if (tweetType === 2) {
      setCurrentTweetType(TweetType.REPOST);
    } else if (tweetType === 1) {
      setCurrentTweetType(TweetType.REPLY);
    } else {
      setCurrentTweetType(TweetType.TWEET);
    }
  }, [tweetType]);

  return (
    <div className="p-2">
      {currentTweetType === TweetType.REPOST && (
        <div className="flex gap-1 m-1">
          <img src={repostIcon} className="h-4" />
          <p className="text-sm text-neutral-400 font-semibold">
            userAddress / userName
          </p>
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-10 w-10 object-contain">
          <GenerateAvatar userAddress={authorAddress} size={40} />
        </div>
        <div className="flex items-center gap-2">
          {authorName !== "" && (
            <>
              <p>{authorName}</p>
              <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
            </>
          )}
          <p>{truncateAddress(authorAddress || "")}</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className="text-neutral-500">
            {calculateTimeDifference(Number(timestamp))}
          </p>
        </div>
      </div>
      <p className="mb-2">{tweetMsg}</p>

      {currentTweetType === TweetType.QUOTE && (
        <div className="border-2 border-neutral-700 mx-auto w-[90%] rounded-md">
          <div className=" p-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 object-contain">
                <GenerateAvatar
                  userAddress={quotedTweetData.authorAddress}
                  size={40}
                />
              </div>
              <div className="flex items-center gap-2">
                {quotedTweetData.authorName !== "" && (
                  <>
                    <p>{quotedTweetData.authorName}</p>
                    <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
                  </>
                )}
                <p>{truncateAddress(quotedTweetData.authorAddress)}</p>
                <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
                <p className="text-neutral-500">
                  {calculateTimeDifference(Number(quotedTweetData.timestamp))}
                </p>
              </div>
            </div>
            <p className="mt-2">{quotedTweetData.tweetMsg}</p>
          </div>
        </div>
      )}

      {/* Post Engagement Buttons */}
      <div className="flex justify-evenly mt-4 pt-2 border-neutral-700 text-neutral-400 relative">
        <div
          onClick={() => handleLike()}
          className="flex items-center gap-1 text-sm"
        >
          <img src={liked ? likePink : like} alt="like" className="h-6 w-6" />
          <p className={liked ? "text-[#f91880]" : " "}>
            {likedAddresses.length}
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <img
            src={comment}
            onClick={() => {
              setIsCommentModalOpen(true);
            }}
            alt="comment"
            className="h-6 w-6"
          />
          <p>{1}</p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <img
            onClick={() => {
              setIsRepostModalOpen(!isRepostModalOpen);
            }}
            src={isRepostModalOpen ? close : reposted ? repostGreen : repost}
            alt="repost"
            className="h-6 w-6"
          />
          <p className={reposted ? "text-[#00b679]" : ""}>{1}</p>
          <RepostModal isOpen={isRepostModalOpen} onClose={closeRespostModal} />
        </div>

        <img src={share} alt="share" className="h-6 w-6" />
        <img
          src={bookmarked ? bookmarkFilled : bookmark}
          alt="bookmark"
          className="h-5 w-5"
          onClick={() => setBookmarked(!bookmarked)}
        />
      </div>

      {/* Modals  */}
      <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} />
    </div>
  );
};

export default Tweet;
