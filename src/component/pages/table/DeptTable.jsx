import React from "react";
import { useNavigate } from "react-router-dom";

const DeptTable = ({ deptData }) => {
  const navigate = useNavigate();
  return (
    <div className="pt-4">
      <table className="w-full   table-auto shadow-2xl  shadow-zinc-700 bg-neutral-900 rounded-lg md:truncate   text-slate-300  border border-slate-700 text-left indent-3">
        <thead className="border-b border-blue-gray-100 ">
          <tr>
            <th>ID</th>
            <th>Department Name</th>
          </tr>
        </thead>
        {deptData.map((i) => (
          <tbody key={i.departmentId}>
            <tr>
              <td>{i.departmentId}</td>
              <td>{i.departmentName}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default DeptTable;
