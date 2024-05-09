import { Link, useLocation } from "react-router-dom";

import home from "../assets/icons/navbar/home.svg";
import message from "../assets/icons/navbar/message.svg";
import bookmarkWhite from "../assets/icons/tweet/bookmark-white.svg";
import logouticon from "../assets/icons/navbar/logout.svg";
import profile from "../assets/icons/navbar/profile.svg";
import magnify from "../assets/icons/navbar/magnify.svg";

import { useAccount, useDisconnect } from "wagmi";
import { GenerateAvatar, truncateAddress } from "../helperFunctions";
import { useState } from "react";
import PostModal from "./Modals/PostModal";

const LeftSidebar = () => {
  const { address: userAddress } = useAccount();

  const location = useLocation();
  const { disconnect } = useDisconnect();

  const [showLogout, setShowLogout] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleShowLogout = () => {
    setShowLogout(!showLogout);
  };

  const onClose = () => {
    setIsPostModalOpen(false);
  };

  const links = [
    { to: "/", label: "Home", icon: home },
    // { to: "/messages", label: "Messages", icon: message },
    { to: "/bookmarks", label: "Bookmarks", icon: bookmarkWhite },
    { to: `/profile/${userAddress}`, label: "Profile", icon: profile },
  ];

  const logout = () => {
    console.log("logout");
    disconnect();
  };

  return (
    <div className="h-screen min-w-[80px] lg:min-w-[200px] pr-2">
      <div className="h-screen flex flex-col justify-between">
        <div>
          <Link
            to="/"
            className="p-2 block my-4 text-xl text-center font-semibold"
          >
            DT
          </Link>

          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                to={link.to}
                key={link.to}
                className={`flex gap-2 p-2 text-xl items-center justify-center lg:justify-start ${
                  location.pathname === link.to
                    ? "border-2 border-neutral-700 rounded-md  "
                    : ""
                }`}
              >
                <img className="h-6 w-6 " src={link.icon} alt={link.label} />
                <p className="hidden lg:block">{link.label}</p>
              </Link>
            ))}
          </div>
          <Link
            to="/explore"
            className={` lg:hidden flex gap-2 p-2 text-xl items-center justify-center lg:justify-start ${
              location.pathname === "search"
                ? "border-2 border-neutral-700 rounded-md  "
                : ""
            }`}
          >
            <img className="h-7 w-7 " src={magnify} alt="search" />
          </Link>

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="bg-white w-full p-2 lg:p-1 lg:text-xl text-lg rounded-md font-semibold text-black mt-2"
          >
            Post
          </button>
        </div>

        <div>
          {showLogout && (
            <div className="flex items-center p-2 gap-2 " onClick={logout}>
              <img
                className="h-6 w-6 mx-auto lg:mx-0"
                src={logouticon}
                alt="logout"
              />
              <p className="hidden lg:block text-xl ">Logout</p>
            </div>
          )}

          <div
            onClick={handleShowLogout}
            className="flex flex-col lg:flex-row gap-2 items-center justify-center border-2 border-neutral-700 rounded-md p-2 mb-6"
          >
            <GenerateAvatar userAddress={String(userAddress)} size={40} />
            <div className="flex-grow lg:block hidden">
              <p className="font-semibold">shaktiii</p>
              <div className="flex">
                <p className="text-sm flex-grow">
                  {truncateAddress(String(userAddress))}
                </p>
                <div className="flex gap-[3px] px-1 items-center">
                  <div className="h-[3px] w-[3px] bg-white rounded-full"></div>
                  <div className="h-[3px] w-[3px] bg-white rounded-full"></div>
                  <div className="h-[3px] w-[3px] bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="flex gap-[3px] px-1 items-center lg:hidden">
              <div className="h-[3px] w-[3px] bg-white rounded-full"></div>
              <div className="h-[3px] w-[3px] bg-white rounded-full"></div>
              <div className="h-[3px] w-[3px] bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <PostModal
        onClose={onClose}
        isOpen={isPostModalOpen}
        isQuotable={false}
        originalTweetIndex={0}
      />
    </div>
  );
};

export default LeftSidebar;
