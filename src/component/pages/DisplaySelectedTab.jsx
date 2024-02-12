import { useEffect, useState } from "react";
import UserTable from "./table/UserTable";
import DeptTable from "./table/DeptTable";
import { fetchDept, fetchUsers } from "../../utils/apiCalls";
import handleDelete from "./handleDelete";
const DisplaySelectedTab = ({ value }) => {
  const fetchData = async () => {
    try {
      const data = await fetchUsers();
      setData(data);
      setDisplayData(data);
      const data2 = await fetchDept();
      setDeptData(data2);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [data, setData] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [searchInput, setSearchInput] = useState({
    name: "",
    email: "",
    departmentName: "",
    position: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value.toLowerCase();
    const targetName = e.target.name;
    setSearchInput({ ...searchInput, [targetName]: query });
  };

  useEffect(() => {
    const filteredData = data.filter((i) => {
      for (const key in searchInput) {
        const value = searchInput[key];
        const name = key;
        if (!i[name].toLowerCase().includes(value)) {
          return false;
        }
      }
      return true;
    });
    setDisplayData(filteredData);
  }, [searchInput, data]);

  return (
    <>
      {value == 0 ? (
        <UserTable
          handleDelete={handleDelete}
          handleSearch={handleSearch}
          displayData={displayData}
        />
      ) : (
        <DeptTable deptData={deptData} />
      )}
    </>
  );
};

export default DisplaySelectedTab;
