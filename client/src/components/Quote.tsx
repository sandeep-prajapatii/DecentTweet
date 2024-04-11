import { useState } from "react";
import Tweet from "./Tweet";
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
import { GenerateAvatar, truncateAddress } from "../helperFunctions";
import CommentModal from "./Modals/CommentModal";

interface QuoteProps {
  address: string;
  timestamp: number;
  content: string;
  index: number;
  currentUserAddress: string;
  likes: number;
  commentCount: number;
  replyIndices: number;
  quoted: boolean;
  quotedTime: string;
  quotedAddress: string;
  quotedContent: string;
  quotedLikes: number,
  quotedCommentCount: number,
  quotedReplyIndices: number,

}

const Quote: React.FC<QuoteProps> = ({
  address,
  timestamp,
  content,
  index,
  currentUserAddress,
  likes,
  commentCount,
  replyIndices,
  quoted,
  quotedTime,
  quotedAddress,
  quotedContent,
  quotedLikes,
  quotedCommentCount,
  quotedReplyIndices,
}) => {
  const shortQuotedAddress = truncateAddress(quotedAddress);

  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [bookmarked, setBookmarked] = useState(true);
  const [openCommment, setOpenComment] = useState(false);
  const [showRepostQuote, setShowRepostQuote] = useState(false);

  const onClose = () => {
    setOpenComment(false);
  };

  const tweetIndexInNumber = Number(3);

  const handleLike = () => {
    // writeContract({
    //   abi: DecentTweetAbi,
    //   address: "0xd0b4e9222bf56dfffa5d0e7a8f317da5a262c43c",
    //   functionName: "likeTweet",
    //   args: [tweetIndexInNumber],
    // });
    setLiked(true);
  };
  return (
    <div className="p-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-10 w-10 object-contain">
          <GenerateAvatar userAddress={quotedAddress} size={40} />
        </div>
        <div className="flex items-center gap-2">
          <p>{shortQuotedAddress}</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className="text-neutral-500">{quotedTime}</p>
        </div>
      </div>
      <p className="mb-2">{quotedContent}</p>

      <div className="border-2 border-neutral-700 mx-auto w-[90%] rounded-md">
      <Tweet
        address={address}
        timestamp={timestamp}
        content={content}
        index={index}
        currentUserAddress={currentUserAddress}
        likes={likes}
        commentCount = {commentCount}
        replyIndices={replyIndices}
        quoted={quoted}
      />
      </div>

      <div className="flex justify-evenly mt-4 pt-2 border-neutral-700 text-neutral-400 relative">
        <div
          onClick={() => handleLike()}
          className="flex items-center gap-1 text-sm"
        >
          <img src={liked ? likePink : like} alt="like" className="h-6 w-6" />
          <p className={liked ? "text-[#f91880]" : " "}>{quotedLikes}</p>
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
          <p>{quotedCommentCount}</p>
        </div>
        <div
          className="flex items-center gap-1 text-sm"
          onClick={() => setShowRepostQuote(!showRepostQuote)}
        >
          <img
            src={showRepostQuote ? close : reposted ? repostGreen : repost}
            alt="repost"
            className="h-6 w-6"
          />
          <p className={reposted ? "text-[#00b679]" : ""}>{quotedReplyIndices}</p>
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
    </div>
  );
};

export default Quote;
