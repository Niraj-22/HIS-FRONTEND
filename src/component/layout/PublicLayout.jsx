import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContent";

const PublicLayout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      return navigate("/");
    }
  }, [auth]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicLayout;
