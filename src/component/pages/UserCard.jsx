import { useState } from "react";
import Popup from "./Popup";

const UserCard = ({ userData = {} }) => {
  const { name, departmentName, position, tags } = userData;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="flex flex-col bg-slate-400 rounded-lg py-4 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        <p className="text-3xl p-2 font-bold">{name || "X Y Z"}</p>
        <p className="px-2 pb-2">Department : {departmentName || "None"}</p>
        <p className="px-2 pb-2">Position : {position || "Entry"}</p>
        <p className="px-2">Tags: </p>
        <div className="grid grid-cols-3 gap-1 px-2 ">
          {tags.map((t) => (
            <p
              key={t}
              className="bg-white text-black rounded-md truncate text-center"
            >
              {t.toUpperCase()}
            </p>
          ))}
        </div>
      </div>
      <Popup
        userData={userData}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

export default UserCard;
