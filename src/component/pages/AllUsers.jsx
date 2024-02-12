import { useEffect, useState } from "react";
import MultiSelectComponent from "./MultiSelectComponent";
import UserCard from "./UserCard";
import Loader from "./Loader";
import { fetchUsers } from "../../utils/apiCalls";
import { filterData } from "../../utils/helperFunctions";
const AllUsers = () => {
  const [userData, setUserData] = useState([]);
  const [selectedDepartment, setSelectDepartment] = useState([]);
  const [selectedPosition, setSelectPosition] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [selectedTags, setSelectTags] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await fetchUsers();
      setUserData(data);
      setDisplayData(data);
      setLoading(false);
    };
    fetch();
  }, []);
  useEffect(() => {
    const departments = userData.map((u) => {
      const departmentName = u.departmentName;
      return departmentName;
    });
    const positions = userData.map((u) => {
      const positionName = u.position.trim();
      return positionName;
    });
    const tags = userData.map((u) => {
      const tagSelect = u.tags;
      return tagSelect;
    });
    const flatTags = [].concat(...tags);

    setSelectDepartment([...new Set(departments)]);
    setSelectPosition([...new Set(positions)]);
    setSelectTags([...new Set(flatTags)]);
  }, [userData]);
  const handleSearch = (target, value) => {
    setSearchInput({ ...searchInput, [target]: value });
  };
  useEffect(() => {
    const filteredData = filterData(userData, searchInput);
    setDisplayData(filteredData);
  }, [searchInput, userData]);
  return (
    <div className="h-full bg-zinc-800 p-4 text-white">
      <div className="p-7 space-x-5 flex flex-wrap">
        <MultiSelectComponent
          options={selectedDepartment}
          title="Department"
          handleSearch={handleSearch}
        />
        <MultiSelectComponent
          options={selectedPosition}
          title="Position"
          handleSearch={handleSearch}
        />
        <MultiSelectComponent
          options={selectedTags}
          title="Tags"
          handleSearch={handleSearch}
        />
      </div>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2   ">
          {displayData.map((u) => {
            return <UserCard userData={u} key={u.id} />;
          })}
        </div>
      )}
    </div>
  );
};
export default AllUsers;
