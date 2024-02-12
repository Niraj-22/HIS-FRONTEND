import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import addUserValidator from "../../validators/addUserValidator";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import Select from "react-select";
import { tags } from "../../constant";
const AddUser = () => {
  const initialFormData = {
    name: "",
    exp: "",
    position: "",
    tags: [],
    dept: "",
    role: 2,
    email: "",
    password: "",
  };

  const initialFormError = {
    name: "",
    exp: "",
    dept: "",
    position: "",
    tags: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
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
  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "rgb(24 24 27)" }),
    option: (styles) => ({
      ...styles,
      backgroundColor: "rgb(24 24 27)",
      color: "rgb(115 115 115)",
    }),
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSelect = (data) => {
    setSelectedOptions(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedTags = selectedOptions.map((option) => option.value);

    const errors = addUserValidator({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      exp: formData.exp,
      tags: selectedOptions,
      dept: formData.dept,
      position: formData.position,
    });

    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.exp ||
      errors.tags ||
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
          password: formData.password,
          exp: formData.exp,
          position: formData.position.trim(),
          tags: selectedTags,
          dept: formData.dept,
          role: formData.role,
        };

        const response = await axios.post("/admin/add-user", requestBody);

        const data = response.data;

        toast.success(data.message, { autoClose: 10000 });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        setSelectedOptions([]);
        navigate("/admin");
      } catch (error) {
        setLoading(false);
        const response = error.response;
        toast.error(response.message, {
          autoClose: true,
        });
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
          <p className="text-center text-2xl  font-mono"> Add User</p>
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
            <div className="flex gap-x-7 ">
              <label className="">Password :</label>
              <input
                className="rounded-xl flex-1 bg-zinc-900 border border-zinc-700  indent-3"
                type="password"
                name="password"
                placeholder=" ***********"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-red-700 text-sm p-1 flex justify-center">
              {formError.password && <p className="">*{formError.password}</p>}
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
                <option value="">Select Department</option>
                {department.map((i) => (
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
              value={`${loading ? " Adding ...." : "Added"}`}
            >
              Add
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

export default AddUser;
