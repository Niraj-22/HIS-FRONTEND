import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);
export const AdminContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const stringifyUserData = window.localStorage.getItem("User");

    if (stringifyUserData) {
      const user = JSON.parse(stringifyUserData);
      setAuth(user);
    } else {
      setAuth(null);
    }
  }, [navigate, location]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const stringifyUserData = window.localStorage.getItem("User");

    if (stringifyUserData) {
      const user = JSON.parse(stringifyUserData);

      if (user.roleId == 1) {
        setAdmin(true);
      }
    } else {
      setAdmin(false);
    }
  }, [navigate, location]);

  return (
    <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
  );
};
export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const useAdmin = () => {
  const admin = useContext(AdminContext);
  return admin;
};
