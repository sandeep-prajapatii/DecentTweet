interface SentMessageProps {
  content: string;
  time: string;
}

const SentMessage: React.FC<SentMessageProps> = ({ content, time }) => {
  return (
    <div className="flex flex-col items-end">
      <p className="bg-blue-500 p-2 px-4 w-fit rounded-s-2xl rounded-tr-2xl rounded-br-sm max-w-[80%]">
        {content}
      </p>
      <p className="text-xs text-neutral-400 mt-1">{time}</p>
    </div>
  );
};

export default SentMessage;
