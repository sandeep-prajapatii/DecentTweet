import React, { useState } from "react";
import ConnectionsProfile from "../components/ConnectionsProfile";

const Connections = () => {
  const [selectedTab, setSelectedTab] = useState("followers");
  return (
    <div>
      <div className="flex border-b-2 border-neutral-700">
        <div
          className="w-full flex justify-center"
          onClick={() => setSelectedTab("followers")}
        >
          <button
            className={`p-2 ${
              selectedTab === "followers" && "border-b-4 border-blue-600"
            }`}
          >
            Followers
          </button>
        </div>
        <div
          className="w-full flex justify-center"
          onClick={() => setSelectedTab("followings")}
        >
          <button
            className={`p-2 ${
              selectedTab === "followings" && "border-b-4 border-blue-600"
            }`}
          >
            Following
          </button>
        </div>
      </div>

        <div>
            <ConnectionsProfile />
            <ConnectionsProfile />
        </div>


    </div>
  );
};

export default Connections;
