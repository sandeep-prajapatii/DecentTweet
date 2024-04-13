import Tweet from "../Tweet";

const LikesDashboard = () => {
  return (
    <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
      <Tweet
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
    </div>
  );
};

export default LikesDashboard;
