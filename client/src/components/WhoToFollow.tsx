import React from "react";
import { GenerateAvatar } from "../helperFunctions";
import pfp1 from "../assets/pfp/pfp1.jpeg";
import pfp2 from "../assets/pfp/pfp2.jpeg";

const WhoToFollow = () => {
  return (
    <div className="border-2 rounded-md border-neutral-700 p-2">
      <p className="text-xl font-semibold mb-4">Who to follow</p>
      <div className="flex flex-col gap-4">

        <div className="flex items-center justify-between border-2 border-neutral-700 rounded-md gap-2 p-2 ">
          <div className="flex gap-2">
            {/* <img src={pfp2} className="h-14 w-14 rounded-full" alt="profile" /> */}
            <div>
             <GenerateAvatar userAddress={"0x2342373992d054eF318081c111cF4C87B44aBa869"} size={40} />
            </div>
            <div className="flex-1">
              <p className="whitespace-nowrap text-ellipsis overflow-hidden md:max-w-[150px]">elonmush</p>
              <p className="text-sm text-neutral-400 whitespace-nowrap text-ellipsis overflow-hidden md:max-w-[150px]" >0x234...869</p>
            </div>
          </div>
          <button className=" bg-white font-semibold text-black px-3 p-1 rounded-lg z-10">
            Follow
          </button>
        </div>
        <div className="flex items-center justify-between border-2 border-neutral-700 rounded-md gap-2 p-2 ">
          <div className="flex gap-2">
          <div>
             <GenerateAvatar userAddress={"0x86786773992d054eF318081c111cF4C87B44aBa869"} size={40} />
            </div>
            <div className="flex-1">
              <p className="whitespace-nowrap text-ellipsis overflow-hidden md:max-w-[150px]">divine</p>
              <p className="text-sm text-neutral-400 whitespace-nowrap text-ellipsis overflow-hidden md:max-w-[150px]" >0x867...869</p>
            </div>
          </div>
          <button className=" bg-white font-semibold text-black px-3 p-1 rounded-lg z-10">
            Follow
          </button>
        </div>
        <div className="flex items-center justify-between border-2 border-neutral-700 rounded-md gap-2 p-2 ">
          <div className="flex gap-2">
          <div>
             <GenerateAvatar userAddress={"0x652373992d054eF318081c111cF4C87B44aBa869"} size={40} />
            </div>
            <div className="flex-1">
              <p className="whitespace-nowrap text-ellipsis overflow-hidden md:max-w-[150px]">chutki</p>
              <p className="text-sm text-neutral-400 whitespace-nowrap text-ellipsis overflow-hidden md:max-w-[150px]" >0x652...869</p>
            </div>
          </div>
          <button className=" bg-white font-semibold text-black px-3 p-1 rounded-lg z-10">
            Follow
          </button>
        </div>

      </div>
    </div>
  );
};

export default WhoToFollow;
