import { useAccount } from "wagmi";
import { GenerateAvatar } from "../helperFunctions";

const Profile = () => {
  const account = useAccount();
  const userAddress: string = account?.address?.toString() || "";

  return (
    <div>
      <p className="text-xl font-bold text-center p-2 border-b-2 border-neutral-700">
        Profile
      </p>
      <div className="flex justify-center mt-4">
        {userAddress && <GenerateAvatar userAddress={userAddress} />}
      </div>
      <div className="ml-4">
        <p className="font-semibold text-lg">Name</p>
        <p>Sandeep Prajapati</p>
      </div>
    </div>
  );
};

export default Profile;
