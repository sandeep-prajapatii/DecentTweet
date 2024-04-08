import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

function App() {
  return (
    <Router>
      <div className="h-screen w-screen bg-neutral-900 text-white">
        <div className="h-screen flex justify-center   ">
          <LeftSidebar />
          <div className="flex-grow max-w-[550px] border border-neutral-700">
            <AppRoutes />
          </div>
          <RightSidebar />
        </div>
      </div>
    </Router>
  );
}

export default App;
