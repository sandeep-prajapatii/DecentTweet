import { useParams } from "react-router-dom";
import { useState } from "react";
import pfp from "../assets/pfp/pfp2.jpeg";
import back from "../assets/back.svg";
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
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";
import {
  UserEngagementDefaultValue,
  UserEngagementType,
} from "../utils/helper";
import { useAccount, useWriteContract } from "wagmi";

const replies = [];
const quotes = [];
const retweets = [];

const TweetPage = () => {
  const { tweetIndex } = useParams();
  const { data: hash, writeContract } = useWriteContract();
  const { address: userAddress } = useAccount();
  const likedBy = "temp";
  const bookmarks = ["fdsfasd", "fasdfasdfa"];
  const DTAAA = {
    address: address as `0x${string}`,
    abi,
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
  const [userEngagement, setUserEngagement] = useState<UserEngagementType>(
    UserEngagementDefaultValue
  );

  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [isRepostModalOpen, setIsRepostModalOpen] = useState<boolean>(false);

  return (
    <div className="">
      <div className="flex items-center p-2">
        <img src={back} className="h-6 w-6" />
        <p className="text-xl font-semibold ml-4">Post</p>
      </div>
      <div className="flex mt-4">
        <img src={pfp} className="h-10 w-10 rounded-full m-2" alt="profile" />
        <div>
          <p className="text-semibold">userName</p>
          <p className="text-neutral-500">@0x58934534j3o45j3o5</p>
        </div>
      </div>
      <p className="px-4">
        This is yiour sfasd fsdf asdf asdtweet bitch fuct you
      </p>

      <div className="flex items-center gap-1 px-4 mt-4 text-neutral-500 text-sm">
        <p className="">5:06 PM</p>
        <span className="h-1 w-1 bg-neutral-500 rounded-full"></span>
        <p>Apr 13, 2024</p>
      </div>

      {/* POST ENGAGEMENT */}
      <div className="flex justify-evenly mt-4 mx-4 p-2  text-neutral-400 relative border-b-2 border-neutral-700">
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
          {/* <RepostModal isOpen={isRepostModalOpen} onClose={closeRespostModal} /> */}
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

      <div className="flex items-center mx-4  border-neutral-700">
        <img src={pfp} className="h-10 w-10 rounded-full m-2" alt="profile" />
        <input
          className="flex-grow  p-2 bg-transparent focus:outline-none"
          type="text"
          placeholder="Post Your Reply"
        />
        <button className="p-1 px-3 rounded-lg bg-white text-black h-fit font-semibold">
          Reply
        </button>
      </div>

      {/* for comment */}
      <div className="mt-4 py-2 border-t-2 border-neutral-700 flex flex-col divide-y">

        <div className="">
          <div className="flex">
            <img
              src={pfp}
              className="h-10 w-10 rounded-full m-2"
              alt="profile"
            />
            <div className="w-full">
              <div className="flex items-center gap-1">
                <p className="font-semibold">username</p>
                <span className="h-1 w-1 bg-neutral-500 rounded-full"></span>

                <p className="text-sm text-neutral-500">0xsdfadfasfa</p>
                <span className="h-1 w-1 bg-neutral-500 rounded-full"></span>

                <p className="text-sm text-neutral-500">20 h ago</p>
              </div>
              <p className="px-2">
                sdf asd dfasdfasdf fda sdf asas dfa sdfasdf asdfasasd fas dfa
                sdf asdf asd fas df asdf asdf asd fas{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-evenly mt-4 mx-4 p-2 text-neutral-400 relative">
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
              {/* <RepostModal isOpen={isRepostModalOpen} onClose={closeRespostModal} /> */}
            </div>

            <img src={share} alt="share" className="h-6 w-6" />
            <div className="flex items-center gap-1 text-sm">
              <img
                src={userEngagement.isBookMarked ? bookmarkFilled : bookmark}
                alt="bookmark"
                className="h-5 w-5"
                onClick={() => handleBookMark()}
              />
              <p
                className={userEngagement.isBookMarked ? "text-[#00b679]" : ""}
              >
                {bookmarks && bookmarks.length}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TweetPage;
