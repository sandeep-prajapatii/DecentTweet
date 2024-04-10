import React, { useState } from "react";
import { GenerateAvatar, truncateAddress } from "../helperFunctions";
import send from "../assets/send.svg";
import emoji from "../assets/icons/createTweet/emoji.svg";
import EmojiPicker from "emoji-picker-react";
import { Theme } from 'emoji-picker-react';

const PersonalMessage = () => {
  const userAddress = "0x910373992d054eF318081c111cF4C87B44aBa869";
  const shortUserAddress = truncateAddress(userAddress);
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSend = () => {
    console.log("send");
  };
  const handleInputChange = (e: any) => {
    setMsg(e.target.value);
  };
  const handleEmojiClick = (selectedEmoji: string) => {
    console.log(selectedEmoji)
    setMsg(msg + selectedEmoji);
  };

  return (
    <div className="flex flex-col justify-between border-2 border-neutral-700 h-screen relative">
      <div>
        <p className="font-semibold p-1">username</p>

        <div className="m-4 flex flex-col items-center border-b-2 border-neutral-700">
          <GenerateAvatar userAddress={userAddress} size={80} />
          <p className="font-semibold">username</p>
          <p className="text-neutral-500">{shortUserAddress}</p>
          <p className="my-4">
            Co-Founder @getWalletX || Changing the world, one frontend at a
            time.
          </p>
        </div>

        <div className="mx-4 flex flex-col gap-3">
          <div className="flex flex-col items-end">
            <p className="bg-blue-500 p-2 px-4 w-fit rounded-s-2xl rounded-tr-2xl rounded-br-sm max-w-[80%]">
              wassupt bitch
            </p>
            <p className="text-xs text-neutral-400 text-right mt-1">10:03 AM</p>
          </div>

          <div className="flex flex-col items-end">
            <p className="bg-blue-500 p-2 px-4 w-fit rounded-s-2xl rounded-tr-2xl rounded-br-sm max-w-[80%]">
              testing ns dfasdf asd fdf f f asdf asd f sadf asdf asd fa sdf asdf
              asd fasd fsa df asdf sadfa sdf a sdfa dsfa f asdf asdf asdf sadf
              sad f asdf asdf as df sdfa sd f sadfa sd f sdfsa dfa sdf sdf as
              dfgsad f sd f asd f asd f sd f sd f ds fd fd f asd fsd fa sd{" "}
            </p>
            <p className="text-xs text-neutral-400 mt-1">10:03 AM</p>
          </div>

          <div className="">
            <p className="bg-neutral-700 p-2 px-4 w-fit rounded-e-2xl rounded-tl-2xl rounded-bl-sm max-w-[80%]">
              Ho gaya bhai pracs
            </p>
            <p className="text-xs text-neutral-400 mt-1">10:03 AM</p>
          </div>
        </div>
      </div>

      {
        showEmoji &&
        <div className="absolute bottom-[4.6rem] right-4">
          <EmojiPicker  theme={Theme.DARK} height={400} width={320} onEmojiClick={(e)=>handleEmojiClick(e.emoji)}/>
        </div>
      }

      <div className=" bg-neutral-700 flex mx-2 rounded-2xl mb-4">
        <input
          className="flex-grow p-2 pl-4 rounded-s-2xl bg-neutral-700 placeholder:text-white focus:outline-none"
          type="text"
          placeholder="Start a new message"
          value={msg}
          onChange={handleInputChange}
        />
        <button className="pr-2" onClick={()=>setShowEmoji(!showEmoji)}>
          <img src={emoji} className="h-6 w-6" />
        </button>
        <button className="pr-2" onClick={handleSend}>
          <img src={send} className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default PersonalMessage;
