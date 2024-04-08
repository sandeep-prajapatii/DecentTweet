import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";


const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
};

export default PublicRoutes;
