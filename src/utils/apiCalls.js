import axios from "./axiosInstance";

export const fetchUsers = async () => {
  try {
    const response = await axios.get("/general/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchDept = async () => {
  try {
    const response = await axios.get("/admin/departments");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProjects = async () => {
  try {
    const response = await axios.get("/general/projects");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
