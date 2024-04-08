import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import home from "../assets/icons/navbar/home.svg";
import magnify from "../assets/icons/navbar/magnify.svg";
import notifications from "../assets/icons/navbar/notification.svg";
import message from "../assets/icons/navbar/message.svg";
import bookmark from "../assets/icons/tweet/bookmark.svg";

import homeFilled from "../assets/icons/navbar/home-filled.svg";
import notificationsFilled from "../assets/icons/navbar/notification-filled.svg";
import bookmarkFilled from "../assets/icons/navbar/bookmark-filled.svg";

const LeftSidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: home },
    { to: "/explore", label: "Explore", icon: magnify },
    { to: "/notifications", label: "Notifications", icon: notifications },
    { to: "/messages", label: "Messages", icon: message },
    { to: "/bookmarks", label: "Bookmarks", icon: bookmark },
  ];

  // const account = useAccount()
  // const { connectors, connect, status, error } = useConnect()
  // const { disconnect } = useDisconnect()

  return (
    <div className="min-w-[80px] lg:min-w-[200px] px-2 ">
      <p className="p-2 my-4 text-xl text-center font-semibold">LOGO</p>

      {links.map((link) => (
        <Link
          to={link.to}
          key={link.to}
          className={`flex gap-2 p-2 text-xl items-center justify-center lg:justify-start ${location.pathname === link.to ? "border-2 border-neutral-700 rounded-md  " : ""}`}
        >
          <img className="h-6 w-6 " src={link.icon} alt={link.label} />
          <p className="hidden lg:block">{link.label}</p>
        </Link>
      ))}

      {/* <div className='border border-yellow-300'>
      <div>
        <h2>Account</h2>
        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>
        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </div> */}
    </div>
  );
};

export default LeftSidebar;
