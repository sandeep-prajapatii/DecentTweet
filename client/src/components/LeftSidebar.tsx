import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import home from  "../icons/navbar/home.svg"
import magnify from  "../icons/navbar/magnify.svg"
import notifications from  "../icons/navbar/notification.svg"
import message from  "../icons/navbar/message.svg"
import bookmark from  "../icons/tweet/bookmark.svg"

import homeFilled from  "../icons/navbar/home-filled.svg"
import notificationsFilled from  "../icons/navbar/notification-filled.svg"
import bookmarkFilled from  "../icons/navbar/bookmark-filled.svg"

const LeftSidebar = () => {
  const location = useLocation();

  const links = [
    { to: '/home', label: 'Home', icon: home },
    { to: '/explore', label: 'Explore', icon:magnify },
    { to: '/notifications', label: 'Notifications', icon: notifications },
    { to: '/messages', label: 'Messages', icon: message },
    { to: '/bookmarks', label: 'Bookmarks', icon: bookmark },
  ];

  return (
    <div className="left-sidebar w-fit px-2">
      <ul>
        {links.map((link) => (
          <li
            key={link.to}
            className={location.pathname === link.to ? 'active bg-white text-black flex gap-2 mt-4' : 'flex gap-2 mt-4'}
          >
            <img className='h-6 w-6' src={link.icon} alt={link.label}/>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;