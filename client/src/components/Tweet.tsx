import like from "../assets/icons/tweet/heart.svg";
import bookmark from "../assets/icons/tweet/bookmark.svg";
import comment from "../assets/icons/tweet/comment.svg";
import share from "../assets/icons/tweet/share.svg";
import repost from "../assets/icons/tweet/repost.svg";
import likePink from "../assets/icons/tweet/heartPink.svg";
import repostGreen from "../assets/icons/tweet/repostGreen.svg";
import bookmarkFilled from "../assets/icons/tweet/bookmark-filled.svg";

import {
  truncateAddress,
  calculateTimeDifference,
  GenerateAvatar,
} from "../helperFunctions";
import { useState } from "react";
import CommentModal from "./CommentModal";

interface TweetProps {
  address: string;
  timestamp: number;
  content: string;
}

const Tweet: React.FC<TweetProps> = ({ address, timestamp, content }) => {
  const userAddress = truncateAddress(address);
  const postedAt = calculateTimeDifference(timestamp);

  const [liked, setLiked] = useState(true);
  const [reposted, setReposted] = useState(true);
  const [bookmarked, setBookmarked] = useState(true);
  const [openCommment, setOpenComment] = useState(false);

  const onClose = () => {
    setOpenComment(false);
  }

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
      <p className="mt-4">{content}</p>

      <div className="flex justify-evenly mt-4 pt-2 border-neutral-700 text-neutral-400">
        <div className="flex items-center gap-1 text-sm">
          <img src={liked ? likePink : like} alt="like" className="h-6 w-6" />
          <p className={liked ? "text-[#f91880]" : " "}>2</p>
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
          <p>2</p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <img
            src={reposted ? repostGreen : repost}
            alt="repost"
            className="h-6 w-6"
          />
          <p className={reposted ? "text-[#00b679]" : ""}>2</p>
        </div>

        <img src={share} alt="share" className="h-6 w-6" />
        <img
          src={bookmarked ? bookmarkFilled : bookmark}
          alt="bookmark"
          className="h-5 w-5"
        />
      </div>
      {openCommment && <CommentModal onClose={onClose} />}
    </div>
  );
};

export default Tweet;
