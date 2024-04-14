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
  UserDetailsDefaultValues,
  UserDetailsType,
  UserEngagementDefaultValue,
  UserEngagementType,
} from "../utils/helper";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";

import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";
import { useLocation, useNavigate } from "react-router-dom";

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
  bookmarks,
}: TweetData) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const navigate = useNavigate();

  const [currentTweetType, setCurrentTweetType] = useState<TweetType>(
    TweetType.TWEET
  );
  const [quotedTweetData, setQuotedTweetData] = useState<QuotedTweetData>(
    QuotedTweetDataDefaultValue
  );
  const [userDetails, setUserDetails] = useState<UserDetailsType>(
    UserDetailsDefaultValues
  );
  // const [currentTweetData, setCurrentTweetData] = useState<TweetData>(
  //   TweetDataDefaultValue
  // );

  const [userEngagement, setUserEngagement] = useState<UserEngagementType>(
    UserEngagementDefaultValue
  );

  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [isRepostModalOpen, setIsRepostModalOpen] = useState<boolean>(false);

  const { data: hash, writeContract } = useWriteContract();
  const { address: userAddress } = useAccount();

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  // userName , quotedData , User Details ,
  const { data } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getUserDetails",
        args: [authorAddress],
      },
      {
        ...DTAAA,
        functionName: "getTweetByIndex",
        args: [quotedTweetIndex],
      },
      {
        ...DTAAA,
        functionName: "getPublicUserDetails",
        args: [authorAddress],
      },
    ],
  });

  // if (data) console.log(data);

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const closeRespostModal = () => {
    setIsRepostModalOpen(false);
  };

  const handleLike = () => {
    // if the user is already present in the liked array then call the dislike function.
    if (userAddress && likedBy && likedBy.includes(userAddress)) {
      // Here call the dislike function
      writeContract({
        ...DTAAA,
        functionName: "dislikeTweet",
        args: [tweetIndex],
      });
    } else {
      writeContract({
        ...DTAAA,
        functionName: "likeTweet",
        args: [tweetIndex],
      });
    }
  };

  const handleReply = (_replyMsg: string) => {
    console.log("this is called");
    writeContract({
      ...DTAAA,
      functionName: "replyToTweet",
      args: [tweetIndex, _replyMsg],
    });
    // if (isSuccess) closeCommentModal();
  };

  const handleBookMark = () => {
    // if the user is already present in the bookmark array then remove it from the book mark.
    if (userAddress && bookmarks && bookmarks.includes(userAddress)) {
      // Here call the dislike function
       writeContract({
         ...DTAAA,
         functionName: "unbookmarkTweet",
         args: [tweetIndex],
       });
    } else {
      writeContract({
        ...DTAAA,
        functionName: "bookmarkTweet",
        args: [tweetIndex],
      });
    }
  };

  // updated the userEngagement.
  useEffect(() => {
    if (userAddress && likedBy && likedBy.includes(userAddress)) {
      setUserEngagement({
        isLiked: true,
      });
    }
    if (userAddress && userDetails.posts.includes(tweetIndex)) {
      setUserEngagement({
        isReplied: true,
      });
    }
    if (userAddress && userDetails.bookmarks.includes(tweetIndex)) {
      setUserEngagement({
        isBookMarked: true,
      });
    }
  }, [likedBy, userDetails, userAddress, tweetIndex]);

  // Updating the userDetails
  useEffect(() => {
    if (data && data[2].result) {
      const result = data[2].result as UserDetailsType;
      setUserDetails({
        userAddress: result.userAddress,
        userName: result.userName,
        userBio: result.userBio,
        bookmarks: result.bookmarks,
        posts: result.posts,
        likes: result.likes,
        replies: result.replies,
        followers: result.followers,
        following: result.following,
      });
    }
  }, [authorAddress, data]);

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

  // Setting the tweet Type
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

  if (currentLocation === "/" && currentTweetType === TweetType.REPLY) return; //this will not render then replies.

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
      <div
        onClick={() => navigate(`/profile/${authorAddress}`)}
        className="flex items-center gap-2 mb-2 "
      >
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
      <p onClick={() => navigate(`/tweet/${tweetIndex}`)} className="mb-2">
        {tweetMsg}
      </p>

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
          <img
            src={userEngagement.isLiked ? likePink : like}
            alt="like"
            className="h-6 w-6"
          />
          <p className={userEngagement.isLiked ? "text-[#f91880]" : " "}>
            {likedBy.length}
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
          <p>{replies.length}</p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <img
            onClick={() => {
              setIsRepostModalOpen(!isRepostModalOpen);
            }}
            src={
              isRepostModalOpen
                ? close
                : userEngagement.isRetweeted
                ? repostGreen
                : repost
            }
            alt="repost"
            className="h-6 w-6"
          />
          <p className={userEngagement.isRetweeted ? "text-[#00b679]" : ""}>
            {quotes.length + retweets.length}
          </p>
          <RepostModal isOpen={isRepostModalOpen} onClose={closeRespostModal} />
        </div>

        <img src={share} alt="share" className="h-6 w-6" />
        <div className="flex items-center gap-1 text-sm">
          <img
            src={userEngagement.isBookMarked ? bookmarkFilled : bookmark}
            alt="bookmark"
            className="h-5 w-5"
            onClick={() => handleBookMark()}
          />
          <p className={userEngagement.isBookMarked ? "text-[#00b679]" : ""}>
            {bookmarks && bookmarks.length}
          </p>
        </div>
      </div>

      {/* Modals  */}
      <CommentModal
        onReply={(_replyMsg) => handleReply(_replyMsg)}
        tweetIndex={tweetIndex}
        authorAddress={authorAddress}
        authorName={authorName}
        timestamp={timestamp}
        tweetMsg={tweetMsg}
        userAddress={userAddress}
        isOpen={isCommentModalOpen}
        onClose={closeCommentModal}
      />
    </div>
  );
};

export default Tweet;
