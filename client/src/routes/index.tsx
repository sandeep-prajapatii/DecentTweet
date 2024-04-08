import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { useAccount } from "wagmi";


const AppRoutes = () => {
  const { isConnected : isLoggedIn } = useAccount()

  return isLoggedIn ? (
    <>
      <div className="h-screen flex justify-center   ">
        <LeftSidebar />
        <div className="flex-grow max-w-[550px] border border-neutral-700">
          <PrivateRoutes />
        </div>
        <RightSidebar />
      </div>
    </>
  ) : (
    <PublicRoutes />
  );
};

export default AppRoutes;
