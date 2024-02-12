import { Navigate, Outlet } from "react-router-dom";
import PrivateNavbar from "../PrivateNavbar";
import { useAuth } from "../context/AuthContent";

const PrivateLayout = () => {
  const auth = useAuth();
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex">
      <PrivateNavbar />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;
