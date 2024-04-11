import React from "react";
import ForYouFeed from "../Feed/ForYouFeed";
import Repost from "../Repost";
import Quote from "../Quote";
import Tweet from "../Tweet";

const LikesDashboard = ({}) => {
  return (
    <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
      <Tweet
        address={"0xD1dA53783AC49c61159182f2f20679338ED852e7"}
        timestamp={1712303549}
        content="Typescript is better than Javascript i think, what you guys say,"
        index={55}
        currentUserAddress=""
        likes={5}
        commentCount={2}
        replyIndices={0}
        quoted={false}
      />
      <Tweet
        address={"0x746h33783AC49c61159182f2f20679338E3746e"}
        timestamp={1712303549}
        content="Whats your favourite school memory ?"
        index={55}
        currentUserAddress=""
        likes={332}
        commentCount={98}
        replyIndices={34}
        quoted={false}
      />
      <Repost
        address={"0x5659373992d054eF318081c111cF4C87B44aBa432"}
        timestamp={1712814671}
        content="Repost if you love long drives with lofi songs"
        index={55}
        currentUserAddress=""
        likes={54}
        commentCount={23}
        replyIndices={8}
        quoted={false}
        repostedBy={"sandeep"}
      />
    </div>
  );
};

export default LikesDashboard;
