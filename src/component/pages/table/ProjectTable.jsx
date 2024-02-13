import React from "react";

const ProjectTable = ({ projectData }) => {
  return (
    <div className="pt-4">
      <table className="w-full   table-auto shadow-2xl  shadow-zinc-700 bg-neutral-900 rounded-lg md:truncate   text-slate-300  border border-slate-700 text-left indent-3">
        <thead className="border-b border-blue-gray-100 ">
          <tr>
            <th>Project Name :</th>
            <th>Project Description </th>
            <th>Project Deadline </th>
            <th>Client Name </th>
          </tr>
        </thead>
        {projectData.map((p) => (
          <tbody key={p.projectId}>
            <tr>
              <td>{p.projectName}</td>
              <td>{p.description}</td>
              <td>{p.deadline}</td>
              <td>{p.clientName}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ProjectTable;
