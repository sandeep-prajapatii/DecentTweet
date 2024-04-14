import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import { GenerateAvatar, generateUsername } from "../helperFunctions";
import PostDashboard from "../components/Dashboard/PostDashboard";
import RepliesDashboard from "../components/Dashboard/RepliesDashboard";
import LikesDashboard from "../components/Dashboard/LikesDashboard";
import {
  DecentTweetAbi as abi,
  DecentTweetContractAddress as address,
} from "../contract/DecentTweetABI";
import { useEffect, useState } from "react";
import { UserDetailsDefaultValues, UserDetailsType } from "../utils/helper";
import { useParams, useNavigate } from "react-router-dom";
import EditProfileModal from "../components/Modals/EditProfileModal";

const Profile = () => {
  const navigate = useNavigate();
  const { userAddress } = useParams();
  const [userDetails, setUserDetails] = useState<UserDetailsType>(
    UserDetailsDefaultValues
  );

  const { address: currentUserAddress } = useAccount();
  const [currentUserDetails, setCurrentUserDetails] = useState<UserDetailsType>(
    UserDetailsDefaultValues
  );

  const [selectedTab, setSelectedTab] = useState("Post");
  const [openEditModal, setOpenEditModal] = useState(false);

  const temp: string = generateUsername(address);
  console.log("username", temp);

  const onClose = () => {
    setOpenEditModal(false);
  };

  const DTAAA = {
    address: address as `0x${string}`,
    abi,
  };

  const { writeContract } = useWriteContract();

  const { data } = useReadContracts({
    contracts: [
      {
        ...DTAAA,
        functionName: "getPublicUserDetails",
        args: [userAddress],
      },
      {
        ...DTAAA,
        functionName: "getPublicUserDetails",
        args: [currentUserAddress],
      },
    ],
  });

  const handleFollowUnfollow = () => {
    if (
      userAddress &&
      currentUserDetails.following.includes(userAddress as `0x${string}`)
    ) {
      writeContract({
        ...DTAAA,
        functionName: "unfollowUser",
        args: [userAddress],
      });
    } else {
      writeContract({
        ...DTAAA,
        functionName: "followUser",
        args: [userAddress],
      });
    }
  };

  useEffect(() => {
    if (data) {
      const result = data[0].result as UserDetailsType;
      setUserDetails({
        userAddress: result.userAddress,
        userName: result.userName,
        userBio: result.userBio,
        bookmarks: result.bookmarks,
        posts: result.posts,
        likes: result.likes,
        replies: result.replies,
        followers: result.followers,
        following: result.following,
      });
    }

    if (data) {
      const result = data[1].result as UserDetailsType;
      setCurrentUserDetails({
        userAddress: result.userAddress,
        userName: result.userName,
        userBio: result.userBio,
        bookmarks: result.bookmarks,
        posts: result.posts,
        likes: result.likes,
        replies: result.replies,
        followers: result.followers,
        following: result.following,
      });
    }
  }, [userAddress, currentUserAddress, data]);

  return (
    <div className="flex flex-col h-full">
      <p className="text-xl font-bold text-center p-2 border-b-2 border-neutral-700">
        Profile
      </p>
      <div className="flex justify-center mt-4">
        {userAddress && <GenerateAvatar userAddress={userAddress} size={150} />}
      </div>

      <div className="mx-4 mt-4">
        <div className="flex">
          <p className="text-xl font-bold flex-grow">
            {userDetails.userName === "" ? "userName" : userDetails.userName}
          </p>
          {currentUserAddress === userAddress ? (
            <button
              className="bg-white text-black font-semibold p-1 px-3 rounded-md"
              onClick={() => setOpenEditModal(true)}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => handleFollowUnfollow()}
                className=" bg-white flex justify-center text-center text-black font-semibold p-1 px-3 rounded-md w-20 h-8"
              >
                {currentUserDetails.following.includes(
                  userAddress as `0x${string}`
                ) ? (
                  <>
                    <p>Unfollow</p>
                  </>
                ) : (
                  <>
                    <p>
                      {currentUserDetails.following.includes(
                        userAddress as `0x${string}`
                      )
                        ? "Following"
                        : "Follow"}
                    </p>
                  </>
                )}
              </button>
            </>
          )}
        </div>
        <p className="text-neutral-400 ">{userDetails.userAddress}</p>
        <p className="mt-4">
          {userDetails.userBio === ""
            ? "Please Add a bio"
            : userDetails.userBio}
        </p>
      </div>

      <div
        className="flex mx-4 mt-4 gap-4"
        onClick={() =>
          navigate(`/profile/connections`, {
            state: { userAddress: userDetails.userAddress },
          })
        }
      >
        <p className="text-neutral-400 ">
          <span className="text-white font-semibold mr-1">
            {userDetails.followers.length}
          </span>
          Followers
        </p>
        <p className="text-neutral-400 ">
          <span className="text-white font-semibold mr-1">
            {userDetails.following.length}
          </span>
          Following
        </p>
      </div>

      <div className="mt-4 flex flex-col flex-grow">
        <div className="flex  border-b border-neutral-700">
          <div className="w-full" onClick={() => setSelectedTab("Post")}>
            <button
              className={`mx-auto block px-4 py-2 ${
                selectedTab === "Post" && "border-b-4"
              }`}
            >
              Post
            </button>
          </div>
          <div className="w-full" onClick={() => setSelectedTab("Replies")}>
            <button
              className={`mx-auto block px-4 py-2 ${
                selectedTab === "Replies" && "border-b-4"
              }`}
            >
              Replies
            </button>
          </div>
          <div className="w-full" onClick={() => setSelectedTab("Likes")}>
            <button
              className={`mx-auto block px-4 py-2 ${
                selectedTab === "Likes" && "border-b-4"
              }`}
            >
              Likes
            </button>
          </div>
        </div>
        <div className="flex-grow ">
          {selectedTab === "Post" && (
            <PostDashboard tweetIndices={userDetails.posts} />
          )}
          {selectedTab === "Replies" && (
            <RepliesDashboard tweetIndices={userDetails.replies} />
          )}
          {selectedTab === "Likes" && (
            <LikesDashboard tweetIndices={userDetails.likes} />
          )}
        </div>
        <EditProfileModal isOpen={openEditModal} onClose={onClose} />
      </div>
    </div>
  );
};

export default Profile;
