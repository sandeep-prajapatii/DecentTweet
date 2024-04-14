import { useParams } from "react-router-dom";

const TweetPage = () => {
  const { tweetIndex } = useParams();
  return <div>{tweetIndex}</div>;
};

export default TweetPage;
