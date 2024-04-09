import like from "../assets/icons/tweet/heart.svg";
import bookmark from "../assets/icons/tweet/bookmark.svg";
import comment from "../assets/icons/tweet/comment.svg";
import share from "../assets/icons/tweet/share.svg";
import repost from "../assets/icons/tweet/repost.svg";
import { truncateAddress, calculateTimeDifference, GenerateAvatar } from "../helperFunctions";

interface TweetProps {
  address: string;
  timestamp: number; 
  content: string;
}

const Tweet : React.FC<TweetProps>= ({address, timestamp, content}) => {
  const userAddress = truncateAddress(address)
  const postedAt = calculateTimeDifference(timestamp);

  return (
    <div className=" border-2 border-neutral-700 rounded-md p-2">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 object-contain">

        <GenerateAvatar userAddress={address} size={40}/>
        </div>
        <div className="flex items-center gap-2">
          <p>{userAddress}</p>
          <span className="h-1 w-1 bg-neutral-300 rounded-full"></span>
          <p className="text-neutral-500">{postedAt}</p>
        </div>
      </div>
      <p className="mt-4">
        {content}
      </p>
      <div className="flex mt-4">
        <img src={like} alt="like" className="h-6 w-6" />
        <img src={bookmark} alt="bookmark" className="h-6 w-6" />
        <img src={comment} alt="comment" className="h-6 w-6" />
        <img src={share} alt="share" className="h-6 w-6" />
        <img src={repost} alt="repost" className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Tweet;
