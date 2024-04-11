import React from "react";
import Repost from "../Repost";
import Quote from "../Quote";
import Tweet from "../Tweet";

const PostDashboard = () => {
  return (
    <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
      <Tweet
        address={"0xD1dA53783AC49c61159182f2f20679338ED852e7"}
        timestamp={1712303549}
        content="Metaverse seems super cool"
        index={55}
        currentUserAddress=""
        likes={5}
        commentCount={2}
        replyIndices={0}
        quoted={false}
      />
      <Repost
        address={"0x910373992d054eF318081c111cF4C87B44aBa869"}
        timestamp={1712814671}
        content="21 years old girl, MP of New Zealand sang Haka in the parliament"
        index={55}
        currentUserAddress=""
        likes={4}
        commentCount={3}
        replyIndices={1}
        quoted={false}
        repostedBy={"shaktii"}
      />
      <Quote
        address={"0x910373992d054eF318081c111cF4C87B44aBa869"}
        timestamp={1712814671}
        content="21 years old girl, MP of New Zealand sang Haka in the parliament"
        index={55}
        currentUserAddress=""
        likes={4}
        commentCount={3}
        replyIndices={2}
        quoted={false}
        quotedTime={"2hours ago"}
        quotedAddress={"0xD1dA53783AC49c61159182f2f20679338ED852e7"}
        quotedContent={"She must be very brave"}
        quotedLikes={2}
        quotedCommentCount={1}
        quotedReplyIndices={1}
      />
                  <Repost
        address={"0x910373992d054eF318081c111cF4C87B44aBa869"}
        timestamp={1712814671}
        content="temp"
        index={55}
        currentUserAddress=""
        likes={22}
        commentCount={13}
        replyIndices={3}
        quoted={false}
        repostedBy={"shaktii"}
      />
      <Tweet
        address={"0xD1dA53783AC49c61159182f2f20679338ED852e7"}
        timestamp={1712303549}
        content="temp"
        index={55}
        currentUserAddress=""
        likes={9}
        commentCount={3}
        replyIndices={1}
        quoted={false}
      />
    </div>
  );
};

export default PostDashboard;
