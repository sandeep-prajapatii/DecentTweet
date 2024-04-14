import pen from "../../assets/pen.svg";
import repostWhite from "../../assets/icons/tweet/repost-white.svg";
import PostModal from "./PostModal";
import { useState } from "react";

type RepostModalProps = {
  isOpen: boolean;
  onClose: () => void; // use it when quoting and repost when calling the function.
  retweet: () => void;
  originalTweetIndex: number;
};

const RepostModal = ({
  isOpen,
  retweet,
  originalTweetIndex,
}: RepostModalProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  return (
    <div className="">
      <div
        className={` ${
          isOpen === false && "hidden"
        } absolute text-white font-semibold divide-y-2 bottom-8 flex flex-col border-2 rounded-md bg-neutral-900 w-fit`}
      >
        <button
          onClick={() => setIsPostModalOpen(true)}
          className="p-2 px-3 flex items-center gap-1"
        >
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
      <PostModal
        onClose={closePostModal}
        isOpen={isPostModalOpen}
        isQuotable={true}
        originalTweetIndex={originalTweetIndex}
      />
    </div>
  );
};

export default RepostModal;
