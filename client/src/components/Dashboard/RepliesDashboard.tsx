import Tweets from "../Tweets";

type RepliesDashboardType = {
  tweetIndices: number[];
};

const RepliesDashboard = ({ tweetIndices }: RepliesDashboardType) => {
  return (
    <div className="p-2 flex flex-col gap-2 divide-y divide-neutral-700">
      {tweetIndices && tweetIndices.length === 0 ? (
        <p>You haven't replied anyone</p>
      ) : (
        <Tweets tweetData={[]} tweetIndices={tweetIndices} />
      )}
    </div>
  );
};

export default RepliesDashboard;
