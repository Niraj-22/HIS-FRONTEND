import React from "react";

const ProjectCard = ({ projectData }) => {
  return (
    <div>
      <div
        className="flex flex-col bg-slate-400 rounded-lg py-4 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <p className="text-3xl p-2 font-bold">{projectData.projectName}</p>
        <p className="px-2 pb-2">Description : {projectData.description}</p>
        <p className="px-2 pb-2 truncate">Deadline : {projectData.deadline}</p>
        <p className="px-2">Client Name: {projectData.clientName} </p>
        <div className="grid grid-cols-3 gap-1 px-2 "></div>
      </div>
    </div>
  );
};

export default ProjectCard;
