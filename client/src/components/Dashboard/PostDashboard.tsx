import Tweets from "../Tweets";

type PostDashboardType = {
  tweetIndices: number[];
};

const PostDashboard = ({ tweetIndices }: PostDashboardType) => {
  return (
    <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
      {tweetIndices && tweetIndices.length === 0 ? (
        <p>You haven't posted any tweet</p>
      ) : (
        <Tweets tweetData={[]} tweetIndices={tweetIndices} />
      )}
    </div>
  );
};

export default PostDashboard;
