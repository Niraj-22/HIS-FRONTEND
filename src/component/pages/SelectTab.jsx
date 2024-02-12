import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectTab({ setValue }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const handleAdd = (e) => {
    e.preventDefault();
    if (selectedTab == 0) {
      navigate("/add-user");
    } else {
      navigate("/add-dept");
    }
  };
  const title = () => {
    if (selectedTab == 0) {
      return "User";
    } else {
      return "Department";
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex p-2 space-x-2 cursor-pointer">
        <button
          type="button"
          onClick={(e) => {
            setValue(Number(e.target.value));
            setSelectedTab(0);
          }}
          value={0}
          className={`p-2 rounded-md ${
            selectedTab === 0 ? "bg-white text-black" : "text-white"
          }`}
        >
          User
        </button>
        <button
          type="button"
          onClick={(e) => {
            setValue(Number(e.target.value));
            setSelectedTab(1);
          }}
          value={1}
          className={`p-2 rounded-md ${
            selectedTab === 1 ? "bg-white text-black" : "text-white"
          }`}
        >
          Department
        </button>
      </div>
      <div className=" p-2">
        <button
          type="button"
          onClick={handleAdd}
          className="p-2 bg-black flex  hover:bg-white text-white hover:text-black rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p className="px-1">Add {title()}</p>
        </button>
      </div>
    </div>
  );
}
