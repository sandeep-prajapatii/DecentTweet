import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { GenerateAvatar, truncateAddress } from "../../helperFunctions";
import send from "../../assets/send.svg";
import emoji from "../../assets/icons/createTweet/emoji.svg";
import cross from "../../assets/cross.svg"
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";

const PersonalMessage = () => {
  const userAddress = "0x98jh2f3783AC49c61159182f53452f20679338ED8";
  const shortUserAddress = truncateAddress(userAddress);
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");
  const location = useLocation();
  const locationState = location.state;
  const handleSend = () => {
    console.log("send");
  };
  const handleInputChange = (e: any) => {
    setMsg(e.target.value);
  };
  const handleEmojiClick = (selectedEmoji: string) => {
    console.log(selectedEmoji);
    setMsg(msg + selectedEmoji);
  };

  return (
    <div className="flex flex-col justify-between border-2 border-neutral-700 h-screen relative max-w-[550px]">
      <div>
        {/* <p className="font-semibold p-1">{locationState.address}</p> */}
        <div className="flex items-center gap-1">
          {/* <img src={back} className="h-6 w-6 lg:hidden" /> */}
          <p className="font-semibold p-1">sandeep</p>
        </div>

        <div className="m-4 flex flex-col items-center border-b-2 border-neutral-700">
          <GenerateAvatar userAddress={userAddress} size={80} />
          <p className="font-semibold">sandy</p>
          <p className="text-neutral-500">{shortUserAddress}</p>
          <p className="my-4">
            Break the cycle, Rise Above
          </p>
        </div>

        <div className="mx-4 flex flex-col gap-3">
          <ReceivedMessage content={"Hey Shakti 👋, how are you"} time={"10:30 AM"}/>
          <SentMessage content ={"Hello Sandeep!"} time={"10:46 AM"}/>
          <SentMessage content ={"Im good, how are you though we havent met in ages"} time={"10:47 AM"}/>
          <SentMessage content ={"When are you coming to mumbai"} time={"10:47 AM"}/>
          <ReceivedMessage content={"Guess what"} time={"10:49 AM"}/>
          <ReceivedMessage content={"Im in mumbai only, I reached yesterday lets catch up where youre free"} time={"10:49 AM"}/>
          <SentMessage content ={"Sounds cool, I will call you"} time={"10:53 AM"}/>
          <ReceivedMessage content ={"yea cool"} time={"10:53 AM"}/>
        </div>
      </div>

      {showEmoji && (
        <div className="absolute bottom-[4.6rem] right-4">
          <EmojiPicker
            theme={Theme.DARK}
            height={400}
            width={320}
            onEmojiClick={(e) => handleEmojiClick(e.emoji)}
          />
        </div>
      )}

      <div className=" bg-neutral-700 flex mx-2 rounded-2xl mb-4">
        <input
          className="flex-grow p-2 pl-4 rounded-s-2xl bg-neutral-700 placeholder:text-white focus:outline-none"
          type="text"
          placeholder="Start a new message"
          value={msg}
          onChange={handleInputChange}
        />
        <button className="pr-2" onClick={() => setShowEmoji(!showEmoji)}>
          <img src={showEmoji ? cross : emoji} className="h-6 w-6" />
        </button>
        <button className="pr-2" onClick={handleSend}>
          <img src={send} className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default PersonalMessage;
