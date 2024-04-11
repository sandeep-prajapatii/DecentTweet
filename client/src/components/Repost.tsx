import React from "react";
import Tweet from "./Tweet";
import repostIcon from "../assets/icons/tweet/repost.svg";

interface RepostProps {
  address: string;
  timestamp: number;
  content: string;
  index: number;
  currentUserAddress: string;
  likes: number;
  commentCount: number;
  replyIndices: number;
  quoted: boolean;
  repostedBy: string;
}


const Repost : React.FC<RepostProps> =({
  address,
  timestamp,
  content,
  index,
  currentUserAddress,
  likes,
  commentCount,
  replyIndices,
  quoted,
  repostedBy
}) => {
  return (
    <div className="p-2 ">
      <div className="flex gap-1 mt-1">
        <img src={repostIcon} className="h-4 h-4" />
        <p className="text-sm text-neutral-400 font-semibold">
          {repostedBy}
        </p>
      </div>
      <Tweet
        address={address}
        timestamp={timestamp}
        content={content}
        index={index}
        currentUserAddress={currentUserAddress}
        likes={likes}
        commentCount={commentCount}
        replyIndices={replyIndices}
        quoted={quoted}
      />
    </div>
  );
};

export default Repost;
