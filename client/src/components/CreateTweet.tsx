import React from "react";
import emoji from "../icons/createTweet/emoji.svg";
import image from "../icons/createTweet/image.svg";
import gif from "../icons/createTweet/gif.svg";

const CreateTweet = () => {
  return (
    <div className="border p-2">
      <input type="text" className="w-full p-2 " />
      <div className="flex justify-between mt-2">
        <div className="flex gap-2 mt-2">
          <img src={image} className="h-6" alt="image" />
          <img src={gif} className="h-6" alt="gif" />
          <img src={emoji} className="h-6 rotate-[15deg]" alt="emoji" />
        </div>
        <button className="bg-white rounded text-blue-500 px-2">Post</button>
      </div>
    </div>
  );
};

export default CreateTweet;
