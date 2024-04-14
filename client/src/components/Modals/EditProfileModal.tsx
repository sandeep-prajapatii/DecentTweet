import { useState } from "react";

import cross from "../../assets/cross.svg";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../../contract/DecentTweetABI";
import { useWriteContract } from "wagmi";

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const [username, setUsername] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  const { writeContract } = useWriteContract();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    const regex = /^[a-z0-9_]*$/;
    if (regex.test(newUsername)) {
      setUsername(newUsername);
      setUsernameError(null);
    } else {
      setUsernameError(
        "Username can only contain lowercase letters, numbers, and underscores."
      );
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBioChange = (e: any) => {
    setUserBio(e.target.value);
  };

  const handleUpdate = () => {
    writeContract({
      ...DTAAA,
      functionName: "updateUserProfile",
      args: [username, userBio],
    });
    onClose()
  };

  return (
    <div
      onClick={onClose}
      className={`${
        isOpen ? "flex" : "hidden"
      } justify-center  h-screen w-screen absolute top-0 left-0 bg-white bg-opacity-20`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-neutral-900 md:mt-12 mt-0  p-4 md:rounded-md rounded-none md:w-[550px] w-full h-full md:h-fit"
      >
        <button onClick={() => onClose()}>
          <img className="h-8 w-8" src={cross} alt="close" />
        </button>

        <div className=" p-2 ">
          <p className="ml-2 font-semibold">Name</p>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-transparent focus:outline-none focus:border-b-2 border-neutral-700"
            placeholder="Please enter name to update"
            value={username}
            onChange={handleUsernameChange}
            pattern="[a-z0-9_]*"
            required
          />
          {usernameError && (
            <p className="text-red-500 mt-2 text-sm text-center">
              {usernameError}
            </p>
          )}
        </div>
        <div className="p-2 ">
          <p className="ml-2 font-semibold">Bio</p>
          <input
            onChange={handleBioChange}
            type="text"
            className="w-full p-2 rounded-md bg-transparent focus:outline-none focus:border-b-2 border-neutral-700"
            placeholder="Please enter bio to update"
          />
        </div>
        <div className="flex items-center mt-5 mb-2">
          <button
            className="font-semibold bg-white px-3 py-1 rounded-md text-black mx-auto"
            onClick={() => handleUpdate()}
          >
            Update Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
