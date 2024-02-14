import { useEffect, useState } from "react";
import MultiSelectComponent from "./MultiSelectComponent";
import Loader from "./Loader";
import { filterData } from "../../utils/helperFunctions";
import DisplaySelectedProject from "./DisplaySelectedProject";
import { pjData } from "../../constant";
const Project = () => {
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

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
          {toggle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
          )}
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
