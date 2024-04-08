import React from "react";
import like from "../assets/icons/tweet/heart.svg";
import bookmark from "../assets/icons/tweet/bookmark.svg";
import comment from "../assets/icons/tweet/comment.svg";
import share from "../assets/icons/tweet/share.svg";
import repost from "../assets/icons/tweet/repost.svg";
import pfp from "../assets/pfp/pfp1.jpeg";

const Tweet = () => {
  return (
    <div className=" border-2 border-neutral-700 rounded-md p-2">
      <div className="flex items-center gap-2">
        <img className="h-10 w-10 rounded-full" src={pfp} />
        <div className="flex items-center gap-2">
          <p>Sandeep Prajapati</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className="text-neutral-500">@sandeep</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className="text-neutral-500">Apr 5</p>
        </div>
      </div>
      <p className="mt-4">
        Description dfas df asd fa sdf asd fas df asdf asd fa sdf asd fas df
        asdfasd fa sdf asdf a df asd fasd fa sdf asdf asd fadsf asdf a{" "}
      </p>
      <div className="flex mt-4">
        <img src={like} alt="" className="h-6 w-6" />
        <img src={bookmark} alt="" className="h-6 w-6" />
        <img src={comment} alt="" className="h-6 w-6" />
        <img src={share} alt="" className="h-6 w-6" />
        <img src={repost} alt="" className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Tweet;
