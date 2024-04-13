import { useState } from "react";
import emoji from "../assets/icons/createTweet/emoji.svg";
import image from "../assets/icons/createTweet/image.svg";
import gif from "../assets/icons/createTweet/gif.svg";
import { useWriteContract } from "wagmi";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";

const CreateTweet = () => {
  const [tweetContent, setTweetContent] = useState("");
  const { writeContract } = useWriteContract();
  const DTAAA = {
    abi,
    address: address as `0x${string}`,
  };

  const tweet = () => {
    if (tweetContent !== "") {
      writeContract({
        // abi,
        // address: address as `0x${string}`,
        ...DTAAA,
        functionName: "createTweet",
        args: [tweetContent],
      });
    } else {
      window.alert("Please enter a valid tweet message.");
    }
    console.log(tweetContent);
    setTweetContent("");
  };
  return (
    <div className="m-2 rounded-md border-2 border-neutral-700 p-2">
      <input
        type="text"
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
        className="w-full p-2 bg-neutral-500 rounded-md placeholder:text-white focus:outline-none focus:border-dashed focus:border-b-2 border-black"
        placeholder="Please Create a Tweet"
      />
      <div className="flex justify-between mt-2">
        <div className="flex gap-2 mt-2">
          <img src={image} className="h-6" alt="image" />
          <img src={gif} className="h-6" alt="gif" />
          <img src={emoji} className="h-6" alt="emoji" />
        </div>

        <button
          className="bg-white rounded text-black px-4 py-1 font-semibold"
          onClick={() => tweet()}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreateTweet;
