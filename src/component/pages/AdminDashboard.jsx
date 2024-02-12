import { useState } from "react";

import SelectTab from "./SelectTab";
import DisplaySelectedTab from "./DisplaySelectedTab";
const AdminDashboard = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="bg-zinc-800 h-full w-full  p-6">
      <div className="">
        <SelectTab setValue={setValue} />
      </div>
      <DisplaySelectedTab value={value} />
    </div>
  );
};

export default AdminDashboard;
