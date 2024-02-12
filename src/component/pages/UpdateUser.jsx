import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import updateUserValidator from "../../validators/updateUserValidator";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import Select from "react-select";
import { colorStyles, tags } from "../../constant";
import { handleTags } from "../../utils/helperFunctions";
const UpdateUser = () => {
  const location = useLocation();
  const userData = location.state;
  const uId = userData.id;
  const dept = userData.departmentName;
  const deptId = String(userData.departmentId);
  const userTags = userData.tags;
  const prefilledTags = handleTags(userTags);

  const initialFormData = {
    name: userData.name,
    exp: userData.experience,
    position: userData.position,
    tags: [],
    dept: deptId,
    role: userData.roleId,
    email: userData.email,
  };

  const initialFormError = {
    name: "",
    exp: "",
    dept: "",
    tags: "",
    position: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(prefilledTags);
  const navigate = useNavigate();
  const fetch = async () => {
    try {
      const response = await axios.get("/admin/departments");
      setDepartment(response.data);
    } catch (error) {
      toast.error("Fetching Failed");
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const filteredDept = department.filter((i) => i.departmentId != deptId);
  const handleSelect = (data) => {
    setSelectedOptions(data);
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedTags = selectedOptions.map((option) => option.value);
    const errors = updateUserValidator({
      name: formData.name,
      email: formData.email,
      exp: formData.exp,
      tags: selectedOptions,
      dept: formData.dept,
      position: formData.position,
    });
    if (
      errors.name ||
      errors.email ||
      errors.tags ||
      errors.exp ||
      errors.dept ||
      errors.position
    ) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        // api request
        const requestBody = {
          name: formData.name,
          email: formData.email,
          tags: selectedTags,
          exp: formData.exp,
          position: formData.position.trim(),
          dept: formData.dept,
          role: formData.role,
        };
        await axios.patch(`/admin/edit-user/${uId}`, requestBody);
        toast.success("User updated successfully", { autoClose: 10000 });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setSelectedOptions([]);
        setLoading(false);
        navigate("/admin");
      } catch (error) {
        setLoading(false);
        const response = error.response;
        toast.error(response.message);
      }
    }
  };

  return (
    <>
      <div className="  h-screen lg:h-lvh  bg-zinc-800 flex  justify-center px-8 py-4">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col container justify-around  shadow-2xl shadow-zinc-700 bg-neutral-900 rounded-3xl md:truncate  p-10  text-slate-300  hover:border border-slate-700"
        >
          <p className="text-center text-2xl  font-mono"> Update User</p>
          <div className="flex  flex-col ">
            <div className="flex gap-x-14  ">
              <label className="">Name :</label>

              <input
                className="rounded-xl flex-1 bg-zinc-900 border border-zinc-700 indent-3"
                type="text"
                name="name"
                placeholder=" X Y Z"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="text-red-700 text-sm p-1 flex justify-center">
              {formError.name && <p>*{formError.name}</p>}
            </div>
          </div>
          <div className="flex  flex-col ">
            <div className="flex gap-x-14    ">
              <label className="">Email :</label>

              <input
                className="rounded-xl flex-1 bg-zinc-900 border border-zinc-700 indent-3 "
                type="email"
                name="email"
                placeholder=" doe@gmail.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="text-red-700 text-sm p-1 flex justify-center">
              {formError.email && <p className="">*{formError.email}</p>}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex  gap-x-5  ">
              <label className="">Experience : </label>

              <input
                className="rounded-xl flex-1 bg-zinc-900 border border-zinc-700 indent-3 "
                type="text"
                name="exp"
                autoComplete="off"
                placeholder=" Experience "
                value={formData.exp}
                onChange={handleChange}
              />
            </div>

            <div className="text-red-700 text-sm p-1 flex justify-center">
              {formError.exp && <p className="">*{formError.exp}</p>}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-x-10 ">
              <label className="">Position :</label>

              <input
                className=" rounded-xl flex-1 bg-zinc-900 border border-zinc-700 indent-3 "
                type="text"
                name="position"
                placeholder=" Senior"
                autoComplete="off"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
            <div className="text-red-700 text-sm p-1 flex justify-center">
              {formError.position && <p className="">*{formError.position}</p>}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-x-14   ">
              <label className="">Tags : </label>
              <Select
                options={tags}
                className=" flex-1 indent-3"
                placeholder="Select Tags"
                value={selectedOptions}
                onChange={handleSelect}
                styles={colorStyles}
                isSearchable={true}
                isMulti
              />
            </div>
            <div className="text-red-700 text-sm p-1 flex justify-center">
              {formError.tags && <p className="">*{formError.tags}</p>}
            </div>
          </div>

          <div className="flex  justify-evenly">
            <div className=" flex  flex-col">
              <label className="text-center ">Dept </label>

              <select
                name="dept"
                onChange={handleChange}
                className="rounded-xl text-center bg-zinc-900 border border-zinc-700 "
              >
                <option value={deptId}>{dept}</option>
                {filteredDept.map((i) => (
                  <option key={i.departmentId} value={i.departmentId}>
                    {i.departmentName}
                  </option>
                ))}
              </select>
              <div className="text-red-700 text-sm p-1 flex justify-center">
                {formError.dept && <p>*{formError.dept}</p>}
              </div>
            </div>
            <div className=" flex  flex-col ">
              <label className="text-center ">Role </label>
              <select
                value={formData.role}
                name="role"
                onChange={handleChange}
                className="text-center rounded-xl  bg-zinc-900 border border-zinc-700  "
              >
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
            </div>
          </div>

          <div className="  flex flex-rol justify-evenly">
            <button
              className="rounded-md  bg-zinc-700 p-2 hover:bg-black"
              type="submit"
              value={`${loading ? "Updating ..." : "Updated"}`}
            >
              Update
            </button>
            <button
              className="rounded-md  bg-zinc-700 p-2 hover:bg-black"
              onClick={() => navigate(-1)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
