import like from "../assets/icons/tweet/heart.svg";
import bookmark from "../assets/icons/tweet/bookmark.svg";
import comment from "../assets/icons/tweet/comment.svg";
import share from "../assets/icons/tweet/share.svg";
import repost from "../assets/icons/tweet/repost.svg";
import likePink from "../assets/icons/tweet/heartPink.svg";
import repostGreen from "../assets/icons/tweet/repostGreen.svg";
import repostWhite from "../assets/icons/tweet/repost-white.svg";
import bookmarkFilled from "../assets/icons/tweet/bookmark-filled.svg";
import close from "../assets/cross.svg";
import pen from "../assets/pen.svg";
import { useWriteContract, useReadContract } from "wagmi";
import {
  truncateAddress,
  calculateTimeDifference,
  GenerateAvatar,
} from "../helperFunctions";
import { useState } from "react";
import CommentModal from "./Modals/CommentModal";
import { DecentTweetAbi } from "../contract/DecentTweetABI";

interface TweetProps {
  address: string;
  timestamp: number;
  content: string;
  index: number;
  currentUserAddress: string;
  likes: number;
  commentCount: number;
  replyIndices: number;
  quoted: boolean;
}

const Tweet: React.FC<TweetProps> = ({
  address,
  timestamp,
  content,
  index,
  currentUserAddress,
  likes,
  commentCount,
  replyIndices,
  quoted,
}) => {
  const { writeContract } = useWriteContract();
  const userAddress = truncateAddress(address);
  const postedAt = calculateTimeDifference(timestamp);

  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [openCommment, setOpenComment] = useState(false);
  const [showRepostQuote, setShowRepostQuote] = useState(false);

  const onClose = () => {
    setOpenComment(false);
  };

  const tweetIndexInNumber = Number(index);

  const handleLike = () => {
    // writeContract({
    //   abi: DecentTweetAbi,
    //   address: "0xd0b4e9222bf56dfffa5d0e7a8f317da5a262c43c",
    //   functionName: "likeTweet",
    //   args: [tweetIndexInNumber],
    // });
    setLiked(true);
  };
  // const handleComment = () => {
  //   writeContract({
  //     abi : DecentTweetAbi,
  //     address: "0xd0b4e9222bf56dfffa5d0e7a8f317da5a262c43c",
  //     functionName: 'commentOnTweet',
  //     args: [
  //       3,
  //       "testing comment"
  //     ],
  //   })
  //   setLiked(true);
  // }

  // const likedByUser = useReadContract({
  //   abi: DecentTweetAbi,
  //   address: "0xd0b4e9222bf56dfffa5d0e7a8f317da5a262c43c",
  //   functionName: "getLikedPosts",
  //   args: [
  //     userAddress
  //   ],
  // });
  // console.log("liked ", likedByUser)

  return (
    <div className=" p-2">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 object-contain">
          <GenerateAvatar userAddress={address} size={40} />
        </div>
        <div className="flex items-center gap-2">
          <p>{userAddress}</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className="text-neutral-500">{postedAt}</p>
        </div>
      </div>
      <p className="mt-2">
        {content}
      </p>

      {!quoted && (
        <>
          <div className="flex justify-evenly mt-4 pt-2 border-neutral-700 text-neutral-400 relative">
            <div
              onClick={() => handleLike()}
              className="flex items-center gap-1 text-sm"
            >
              <img
                src={liked ? likePink : like}
                alt="like"
                className="h-6 w-6"
              />
              <p className={liked ? "text-[#f91880]" : " "}>{likes}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <img
                src={comment}
                onClick={() => {
                  setOpenComment(true);
                }}
                alt="comment"
                className="h-6 w-6"
              />
              <p>{commentCount}</p>
            </div>
            <div
              className="flex items-center gap-1 text-sm"
              onClick={() => setShowRepostQuote(!showRepostQuote)}
            >
              <img
                src={showRepostQuote ? close : reposted ? repostGreen : repost}
                // src={reposted ? repostGreen : repost}
                alt="repost"
                className="h-6 w-6"
              />
              <p className={reposted ? "text-[#00b679]" : ""}>{replyIndices}</p>
            </div>

            {showRepostQuote && (
              <div className="absolute text-white font-semibold divide-y-2 bottom-8 flex flex-col border-2 rounded-md bg-neutral-900">
                <button className="p-2 px-3 flex items-center gap-1">
                  <img src={pen} alt="Quote" className="h-4 w-4" />
                  Quote
                </button>
                <button className="p-2 px-3 flex items-center gap-1">
                  <img src={repostWhite} alt="Repost" className="h-5 w-5" />
                  Repost
                </button>
              </div>
            )}

            <img src={share} alt="share" className="h-6 w-6" />
            <img
              src={bookmarked ? bookmarkFilled : bookmark}
              alt="bookmark"
              className="h-5 w-5"
              onClick={()=>setBookmarked(!bookmarked)}
            />
          </div>
          {openCommment && <CommentModal onClose={onClose} />}
        </>
      )}
    </div>
  );
};

export default Tweet;
