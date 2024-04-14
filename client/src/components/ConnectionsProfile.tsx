import React from "react";
import pfp from "../assets/pfp/default.jpeg"

const ConnectionsProfile = () => {
  return (
    <div className="flex p-2 py-4 border-b border-neutral-700">
      <img src={pfp} className="h-10 my-1 mr-2 w-10 rounded-full" />
      <div className="w-full">
        <div className="flex">
          <div className="flex-grow">
            <p>Sandeep Prajapati</p>
            <p className="text-sm text-neutral-500">0xDFDFALKF980ASDFA9</p>
          </div>

          <button className="bg-white p-1 px-3 text-black font-semibold rounded-md  h-fit">
            Follow
          </button>
        </div>
        <p>
          The original Bitcoin advocacy organization. We raise awareness of the
          benefits, uses and technology of #Bitcoin and support global #BTC
          adoption.
        </p>
      </div>
    </div>
  );
};

export default ConnectionsProfile;
