import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Notifications from "../pages/Notifications";
import Messages from "../pages/Messages";
import Bookmarks from "../pages/Bookmarks";
import Profile from "../pages/Profile";
import TweetPage from "../pages/TweetPage";
import Connections from "../pages/Connections";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/personal-msg" element={<Messages />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/profile/:userAddress" element={<Profile />} />
      <Route path="/tweet/:tweetIndex" element={<TweetPage />} />
      <Route path="/profile/connections" element={<Connections />} />
    </Routes>
  );
};

export default PrivateRoutes;
