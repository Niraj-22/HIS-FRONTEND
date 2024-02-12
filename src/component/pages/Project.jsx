import { useEffect, useState } from "react";
import MultiSelectComponent from "./MultiSelectComponent";
import Loader from "./Loader";
import { filterData } from "../../utils/helperFunctions";
const Project = () => {
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [loading, setLoading] = useState(false);

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
    const filteredData = filterData(projectData, searchInput);
    setDisplayData(filteredData);
  }, [searchInput, projectData]);

  return (
    <div className="h-full bg-zinc-800 p-4 text-white">
      <div className="p-7 space-x-5 flex flex-wrap">
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
      </div>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 "></div>
      )}
    </div>
  );
};

export default Project;
