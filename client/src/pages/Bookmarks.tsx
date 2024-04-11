import React from "react";
import Tweet from "../components/Tweet";

const Bookmarks = () => {
  return (
    <div>
      <p className="text-xl font-bold text-center p-2 border-b-2 border-neutral-700">
        Bookmarks
      </p>

        <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
          <Tweet
            address={"0x564553783AC49c61159182f2f20679338ED852e7"}
            timestamp={1712303549}
            content="Make goals not dreams boy"
            index={55}
            currentUserAddress=""
            likes={5}
            commentCount={2}
            replyIndices={0}
            quoted={false}
          />
          <Tweet
            address={"0x7gh443783AC49c61159182f552f20679338E3746e"}
            timestamp={1712303549}
            content="People used to go to war what you scared of ?"
            index={55}
            currentUserAddress=""
            likes={332}
            commentCount={98}
            replyIndices={34}
            quoted={false}
          />
          <Tweet
            address={"0x64545443783AC49c61159182f552f20679338E3dfvdr4"}
            timestamp={1712303549}
            content='USE THIS COUPON CODE TO GET 50% OFF ON OUR LATEST PRODUCTS "JUSTDOIT"'
            index={55}
            currentUserAddress=""
            likes={332}
            commentCount={98}
            replyIndices={34}
            quoted={false}
          />
        </div>
    </div>
  );
};

export default Bookmarks;
