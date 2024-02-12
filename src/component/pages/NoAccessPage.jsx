import React from "react";
import { useNavigate } from "react-router-dom";

const NoAccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-zinc-800  text-white">
      <h1 className="text-2xl p-2">You do not have access to admin Controls</h1>
      <div className="flex space-x-3">
        <button
          type="button"
          className="rounded-md  bg-zinc-700  hover:bg-black p-2 "
          onClick={() => navigate("/")}
        >
          Go back
        </button>
        <button
          type="button"
          className="rounded-md  bg-zinc-700 p-2 hover:bg-black "
          onClick={() => {
            window.localStorage.removeItem("User");
            navigate("/login");
          }}
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default NoAccessPage;
