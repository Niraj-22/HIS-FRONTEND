import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateLayout, AdminLayout, PublicLayout } from "./component/layout";
import { Suspense, lazy } from "react";
import Loader from "./component/pages/Loader";
// import {
//   AddDepartment,
//   AddUser,
//   AdminDashboard,
//   Home,
//   Login,
//   PageNotFound,
//   UpdateUser,
//   Profile,
//   AllUsers,
//   Project,
// } from "./component/pages";
const AddDepartment = lazy(() => import("./component/pages/AddDepartment"));
const AddUser = lazy(() => import("./component/pages/AddUser"));
const AdminDashboard = lazy(() => import("./component/pages/AdminDashboard"));
const Home = lazy(() => import("./component/pages/Home"));
const Login = lazy(() => import("./component/pages/Login"));
const PageNotFound = lazy(() => import("./component/pages/PageNotFound"));
const UpdateUser = lazy(() => import("./component/pages/UpdateUser"));
const Profile = lazy(() => import("./component/pages/Profile"));
const AllUsers = lazy(() => import("./component/pages/AllUsers"));
const Project = lazy(() => import("./component/pages/Project"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
