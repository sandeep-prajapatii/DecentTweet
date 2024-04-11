import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { useAccount } from "wagmi";
import PersonalMessage from "../components/Messages/PersonalMessage";
import { useLocation } from "react-router-dom";

const AppRoutes = () => {
  const { isConnected: isLoggedIn } = useAccount();
  const location = useLocation();
  const currentLocation = location.pathname;

  return isLoggedIn ? (
    <>
      <div className="h-screen flex justify-center overflow-hidden   ">
        <LeftSidebar />
        <div className="flex-grow max-w-[550px] border border-neutral-700 min-h-screen overflow-auto scrollbar">
          <PrivateRoutes />
        </div>
        {currentLocation === "/personal-msg" ? (
          <PersonalMessage />
        ) : (
          <RightSidebar />
        )}
      </div>
    </>
  ) : (
    <PublicRoutes />
  );
};

export default AppRoutes;
