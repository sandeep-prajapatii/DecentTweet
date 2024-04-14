import Search from "../components/Search";
import MessageLog from "../components/Messages/MessageLog";
// import PersonalMessage from "../components/Messages/PersonalMessage";



const Messages = () => {
  return (
    <div>
      <p className="text-xl font-bold text-center p-2 border-b-2 border-neutral-700">
        Messages
      </p>
      <div className="px-2">
        <Search />
      </div>
      <div className="flex flex-col gap-2">
        <MessageLog username="sandy" timestamp="11 min ago" content="yea cool" address="0x98jh2f3783AC49c61159182f53452f20679338ED8" />
        {/* <MessageLog username="aman" timestamp="1 hour ago" content="text me when your project is completed" address="0x2k53453783AC49c61159182f2f20679338ED8" />
        <MessageLog username="rohan" timestamp="3 hour ago" content="thankyou shakti, i call you later" address="0x5f32345g783AC49c61159182f2f20679338ED8" />
        <MessageLog username="bhumi" timestamp="3 hour go" content="Please join the meeting asap" address="0x35533AC49c61159182f2f20679338ED8" />
        <MessageLog username="arjun" timestamp="2 day ago" content="yea I'll catch you there" address="0x245gd3783AC49c61159182f2f20679338ED8" />
        <MessageLog username="bhumik" timestamp="3 day ago" content="bye" address="0x2fsd9fd3783AC49c61159182f2f20679338ED8" /> */}
      </div>
      {/* <PersonalMessage /> */}
    </div>
  );
};

export default Messages;
