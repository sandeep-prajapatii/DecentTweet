import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import back from "../assets/back.svg";
import like from "../assets/icons/tweet/heart.svg";
import bookmark from "../assets/icons/tweet/bookmark.svg";
import share from "../assets/icons/tweet/share.svg";
import repost from "../assets/icons/tweet/repost.svg";
import likePink from "../assets/icons/tweet/heartPink.svg";
import repostGreen from "../assets/icons/tweet/repostGreen.svg";
import bookmarkFilled from "../assets/icons/tweet/bookmark-filled.svg";
import close from "../assets/cross.svg";

import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";
import {
  TweetData,
  TweetDataDefaultValue,
  UserDetailsDefaultValues,
  UserDetailsType,
  UserEngagementDefaultValue,
  UserEngagementType,
} from "../utils/helper";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import {
  GenerateAvatar,
  formatUnixTimestamp,
  truncateAddress,
} from "../helperFunctions";
import RepostModal from "../components/RepostModal";
import Tweets from "../components/Tweets";

const TweetPage = () => {
  const { tweetIndex } = useParams();
  const navigate = useNavigate();

  const [currentTweetData, setCurrentTweetData] = useState<TweetData>(
    TweetDataDefaultValue
  );

  const [userReply, setUserReply] = useState<string>("");

  const [userEngagement, setUserEngagement] = useState<UserEngagementType>(
    UserEngagementDefaultValue
  );
  const [isRepostModalOpen, setIsRepostModalOpen] = useState<boolean>(false);

  const { writeContract } = useWriteContract();
  const { address: userAddress } = useAccount();

  const [userDetails, setUserDetails] = useState<UserDetailsType>(
    UserDetailsDefaultValues
  );

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  const { data: contractData } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getTweetByIndex",
        args: [tweetIndex],
      },
      {
        ...DTAAA,
        functionName: "getPublicUserDetails",
        args: [userAddress],
      },
    ],
  });

  const closeRespostModal = () => {
    setIsRepostModalOpen(false);
  };

  const handleLike = () => {
    // if the user is already present in the liked array then call the dislike function.
    if (
      userAddress &&
      currentTweetData.likedBy &&
      currentTweetData.likedBy.includes(userAddress)
    ) {
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
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserReply(e.target.value);
  };

  const handleReply = () => {
    console.log("this is called");
    writeContract({
      ...DTAAA,
      functionName: "replyToTweet",
      args: [tweetIndex, userReply],
    });
  };

  const handleRetweet = () => {
    writeContract({
      ...DTAAA,
      functionName: "retweet",
      args: [tweetIndex],
    });
    closeRespostModal();
  };
  const handleBookMark = () => {
    // if the user is already present in the bookmark array then remove it from the book mark.
    if (
      userAddress &&
      currentTweetData.bookmarks &&
      currentTweetData.bookmarks.includes(userAddress)
    ) {
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
    if (
      userAddress &&
      currentTweetData.likedBy &&
      currentTweetData.likedBy.includes(userAddress)
    ) {
      setUserEngagement({
        isLiked: true,
      });
    }
    if (
      tweetIndex &&
      userAddress &&
      userDetails.posts.includes(Number(tweetIndex))
    ) {
      setUserEngagement({
        isReplied: true,
      });
    }
    if (
      tweetIndex &&
      userAddress &&
      userDetails.bookmarks.includes(Number(tweetIndex))
    ) {
      setUserEngagement({
        isBookMarked: true,
      });
    }
  }, [userDetails, userAddress, tweetIndex, currentTweetData.likedBy]);

  useEffect(() => {
    if (contractData && contractData[0].result) {
      const tweetData = contractData[0].result as TweetData;
      setCurrentTweetData(tweetData);
    }

    if (contractData && contractData[1].result) {
      const userDetails = contractData[1].result as UserDetailsType;
      setUserDetails(userDetails);
    }
  }, [contractData]);

  return (
    <div className="">
      <div className="flex items-center p-2">
        <img onClick={() => navigate("/")} src={back} className="h-6 w-6" />
        <p className="text-xl font-semibold ml-4">Post</p>
      </div>
      <div className="flex mt-4 px-2">
        <GenerateAvatar
          userAddress={currentTweetData.authorAddress}
          size={40}
        />
        <div>
          <p className="text-semibold">{currentTweetData.authorName}</p>
          <p className="text-neutral-500">
            @{truncateAddress(String(currentTweetData.authorAddress))}
          </p>
        </div>
      </div>
      <p className="px-4">{currentTweetData.tweetMsg}</p>

      <div className="flex items-center gap-1 px-4 mt-4 text-neutral-500 text-sm">
        {/* <p className="">5:06 PM</p>
        <span className="h-1 w-1 bg-neutral-500 rounded-full"></span> */}
        <p>{formatUnixTimestamp(Number(currentTweetData.timestamp))}</p>
      </div>

      {/* POST ENGAGEMENT */}
      <div className="flex justify-between mt-4 mx-3 py-2 px-4  text-neutral-400 relative border-y-2 border-neutral-700">
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
            {currentTweetData.likedBy && currentTweetData.likedBy.length}
          </p>
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
            {currentTweetData.quotes &&
              currentTweetData.retweets &&
              currentTweetData.quotes.length + currentTweetData.retweets.length}
          </p>
          <RepostModal
            isOpen={isRepostModalOpen}
            onClose={closeRespostModal}
            retweet={() => handleRetweet()}
            originalTweetIndex={Number(tweetIndex)}
          />
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
            {currentTweetData.bookmarks && currentTweetData.bookmarks.length}
          </p>
        </div>
      </div>

      <div className="flex items-center mx-4 py-2 border-neutral-700">
        <GenerateAvatar userAddress={String(userAddress)} size={40} />
        <input
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => handleChange(e)}
          className="flex-grow  p-2 bg-transparent focus:outline-none"
          type="text"
          placeholder="Post Your Reply"
        />
        <button
          onClick={() => handleReply()}
          className="p-1 px-3 rounded-lg bg-white text-black h-fit font-semibold"
        >
          Reply
        </button>
      </div>

      {/* for comment */}
      <Tweets tweetData={[]} tweetIndices={currentTweetData.replies} />
    </div>
  );
};

export default TweetPage;
