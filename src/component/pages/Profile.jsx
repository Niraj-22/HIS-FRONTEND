import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import editUserValidator from "../../validators/editUserValidator";
import { handleTags } from "../../utils/helperFunctions";
import { colorStyles, tags } from "../../constant";

const Profile = () => {
  const user = JSON.parse(window.localStorage.getItem("User"));
  const uId = user.id;
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/user/get-user/${uId}`);
      const data = response.data;
      setFormData({
        name: data.name,
        email: data.email,
        position: data.position,
        departmentName: data.departmentName,
        experience: data.experience,
      });
      const userTags = response.data.tags;
      const tag = handleTags(userTags);
      setSelectedOptions(tag);
    };
    fetchUser();
  }, [uId]);

  const initialFormError = {
    name: "",
    email: "",
    exp: "",
    tags: "",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    departmentName: "",
    experience: "",
    tags: [],
  });

  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();

  const handleSelect = (data) => {
    setSelectedOptions(data);
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedTags = selectedOptions.map((option) => option.value);
    const errors = editUserValidator({
      name: formData.name,
      email: formData.email,
      exp: formData.experience,
      tags: selectedOptions,
    });

    if (errors.name || errors.email || errors.tags || errors.exp) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        // api request
        const requestBody = {
          name: formData.name,
          email: formData.email,
          tags: selectedTags,
          exp: formData.experience,
        };
        await axios.patch(`/user/edit-profile/${uId}`, requestBody);

        toast.success("Profile updated successfully", { autoClose: 10000 });
        setFormError(initialFormError);
        setLoading(false);
        navigate("/profile");
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
          <p className="text-center text-2xl  font-mono"> User Profile</p>
          <div className="flex  flex-col ">
            <div className="flex gap-x-14  ">
              <label className="">Name :</label>

              <input
                className="rounded-xl flex-1 outline-none bg-zinc-900 border border-zinc-700 indent-3"
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
                className="rounded-xl flex-1 outline-none bg-zinc-900 border border-zinc-700 indent-3 "
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
                className="rounded-xl flex-1 bg-zinc-900 border outline-none border-zinc-700 indent-3 "
                type="text"
                name="experience"
                autoComplete="off"
                placeholder=" Experience "
                value={formData.experience}
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
                className=" rounded-xl flex-1 bg-slate-600 border outline-none border-zinc-700 cursor-default indent-3 "
                name="position"
                value={formData.position}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-x-2.5 ">
              <label className="">Department :</label>

              <input
                className=" rounded-xl flex-1 bg-slate-600 border outline-none border-zinc-700 indent-3 cursor-default"
                name="department"
                value={formData.departmentName}
                readOnly
              />
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

          <div className="  flex flex-rol justify-evenly">
            <button
              className="rounded-md  bg-zinc-700 p-2 hover:bg-black"
              type="submit"
              value={`${loading ? "Updating ...." : "Updated"}`}
            >
              Save
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

export default Profile;
