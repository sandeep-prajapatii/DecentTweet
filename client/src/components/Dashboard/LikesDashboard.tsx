import Tweets from "../Tweets";

type LikesDashboardType = {
  tweetIndices: number[];
};
const LikesDashboard = ({ tweetIndices }: LikesDashboardType) => {
  return (
    <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
      {tweetIndices && tweetIndices.length === 0 ? (
        <p>You haven't Liked any post</p>
      ) : (
        <Tweets tweetData={[]} tweetIndices={tweetIndices} />
      )}
    </div>
  );
};

export default LikesDashboard;
