import React from "react";
import like from "../icons/tweet/heart.svg"
import bookmark from "../icons/tweet/bookmark.svg"
import comment from "../icons/tweet/comment.svg"
import share from "../icons/tweet/share.svg"
import repost from "../icons/tweet/repost.svg"

const Tweet = () => {
  return (
    <div className=" border p-2">
      <div className="flex">
        <p>Sandeep Prajapati</p>
        <p className="text-stone-400">@sandeep</p>
        <p className="text-stone-400">Apr 5</p>
      </div>
      <p className="mt-4">
        Description dfas df asd fa sdf asd fas df asdf asd fa sdf asd fas df
        asdfasd fa sdf asdf a df asd fasd fa sdf asdf asd fadsf asdf a{" "}
      </p>
      <div className="flex mt-4">
        <img src={like} alt="" className="h-6 w-6"/>
        <img src={bookmark} alt="" className="h-6 w-6"/>
        <img src={comment} alt="" className="h-6 w-6"/>
        <img src={share} alt="" className="h-6 w-6"/>
        <img src={repost} alt="" className="h-6 w-6"/>
      </div>
    </div>
  );
};

export default Tweet;
