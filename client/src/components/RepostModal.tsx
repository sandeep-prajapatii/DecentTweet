import pen from "../assets/pen.svg";
import repostWhite from "../assets/icons/tweet/repost-white.svg";

type RepostModalProps = {
  isOpen: boolean;
  onClose: () => void; // use it when quoting and repost when calling the function.
  retweet: () => void;
};

const RepostModal = ({ isOpen, retweet }: RepostModalProps) => {
  return (
    <div
      className={` ${
        isOpen === false && "hidden"
      } absolute text-white font-semibold divide-y-2 bottom-8 flex flex-col border-2 rounded-md bg-neutral-900`}
    >
      <button className="p-2 px-3 flex items-center gap-1">
        <img src={pen} alt="Quote" className="h-4 w-4" />
        Quote
      </button>
      <button
        onClick={() => retweet()}
        className="p-2 px-3 flex items-center gap-1"
      >
        <img src={repostWhite} alt="Repost" className="h-5 w-5" />
        Repost
      </button>
    </div>
  );
};

export default RepostModal;
