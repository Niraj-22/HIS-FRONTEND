import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateLayout, AdminLayout, PublicLayout } from "./component/layout";
import {
  AddDepartment,
  AddUser,
  AdminDashboard,
  Home,
  Login,
  PageNotFound,
  UpdateUser,
  Profile,
  AllUsers,
} from "./component/pages";
import Project from "./component/pages/Project";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/project" element={<Project />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-dept" element={<AddDepartment />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
