
import React from "react";
import emoji from "../assets/icons/createTweet/emoji.svg";
import image from "../assets/icons/createTweet/image.svg";
import gif from "../assets/icons/createTweet/gif.svg";

const CreateTweet = () => {
  return (
    <div className="m-2 rounded-md border-2 border-neutral-700 p-2">
      <input type="text"  className="w-full p-2 bg-neutral-500 rounded-md placeholder:text-white focus:outline-none focus:border-dashed focus:border-b-2 border-black" placeholder="Please Create a Tweet"/>
      <div className="flex justify-between mt-2">
        <div className="flex gap-2 mt-2">
          <img src={image} className="h-6" alt="image" />
          <img src={gif} className="h-6" alt="gif" />
          <img src={emoji} className="h-6 rotate-[15deg]" alt="emoji" />
        </div>
        <button className="bg-white rounded text-black px-4 py-1 font-semibold">Post</button>
      </div>
    </div>
  );
};

export default CreateTweet;
