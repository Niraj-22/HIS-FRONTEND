import React from "react";
import ProjectCard from "./ProjectCard";
import ProjectTable from "./table/ProjectTable";
const DisplaySelectedProject = ({ toggle, projectData }) => {
  return (
    <>
      {toggle ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
          {projectData.map((p) => {
            return <ProjectCard projectData={p} key={p.projectId} />;
          })}
        </div>
      ) : (
        <ProjectTable projectData={projectData} />
      )}
    </>
  );
};

export default DisplaySelectedProject;
