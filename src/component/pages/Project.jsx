import { useEffect, useState } from "react";
import MultiSelectComponent from "./MultiSelectComponent";
import Loader from "./Loader";
import { filterData } from "../../utils/helperFunctions";
import DisplaySelectedProject from "./DisplaySelectedProject";
const Project = () => {
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const pjData = [
    {
      projectId: 1,
      projectName: "Project 1",
      deadline: "2024-04-30",
      description: "This is the first project description.",
      clientName: "Client A",
    },
    {
      projectId: 2,
      projectName: "Project 2",
      deadline: "2024-05-15",
      description: "This is the second project description.",
      clientName: "Client B",
    },
    {
      projectId: 3,
      projectName: "Project 3",
      deadline: "2024-06-30",
      description: "This is the third project description.",
      clientName: "Client C",
    },
    {
      projectId: 4,
      projectName: "Project 4",
      deadline: "2024-07-15",
      description: "This is the fourth project description.",
      clientName: "Client D",
    },
    {
      projectId: 5,
      projectName: "Project 5",
      deadline: "2024-08-30",
      description: "This is the fifth project description.",
      clientName: "Client E",
    },
    {
      projectId: 6,
      projectName: "Project 6",
      deadline: "2024-09-15",
      description: "This is the sixth project description.",
      clientName: "Client F",
    },
    {
      projectId: 7,
      projectName: "Project 7",
      deadline: "2024-10-30",
      description: "This is the seventh project description.",
      clientName: "Client G",
    },
    {
      projectId: 8,
      projectName: "Project 8",
      deadline: "2024-11-15",
      description: "This is the eighth project description.",
      clientName: "Client H",
    },
    {
      projectId: 9,
      projectName: "Project 9",
      deadline: "2024-12-30",
      description: "This is the ninth project description.",
      clientName: "Client I",
    },
    {
      projectId: 10,
      projectName: "Project 10",
      deadline: "2025-01-15",
      description: "This is the tenth project description.",
      clientName: "Client J",
    },
    {
      projectId: 11,
      projectName: "Project 11",
      deadline: "2025-02-28",
      description: "This is the eleventh description.",
      clientName: "Client K",
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      // const data = await fetchProjects();
      const data = [];
      setProjectData(data);
      setDisplayData(data);
      setLoading(false);
    };
    fetch();
  }, []);
  useEffect(() => {
    const projects = projectData.map((p) => {
      const projectName = p.projectName;
      return projectName;
    });
    const users = projectData.map((p) => {
      const userName = p.projectName;
      return userName;
    });

    setSelectedProject([...new Set(projects)]);
    setSelectedUser([...new Set(users)]);
  }, [projectData]);
  const handleSearch = (target, value) => {
    setSearchInput({ ...searchInput, [target]: value });
  };
  useEffect(() => {
    const filteredData = filterData(displayData, searchInput);
    setProjectData(filteredData);
  }, [searchInput, displayData]);

  return (
    <div className="h-full bg-zinc-800 p-4 text-white">
      <div className="p-7 space-x-5 flex flex-wrap ">
        <MultiSelectComponent
          options={selectedProject}
          title="Project"
          handleSearch={handleSearch}
        />
        <MultiSelectComponent
          options={selectedUser}
          title="User"
          handleSearch={handleSearch}
        />
        <button onClick={() => setToggle((prev) => !prev)} type="button">
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <DisplaySelectedProject toggle={toggle} projectData={pjData} />
      )}
    </div>
  );
};

export default Project;
