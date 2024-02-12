import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";

const AddDepartment = () => {
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      departmentName: department,
    };
    try {
      await axios.post("/admin/add-department", requestBody);
      toast.success("Department added successfully");
    } catch (error) {
      toast.error("Failed");
    }
    setDepartment("");
    navigate("/admin");
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen text-slate-300 bg-zinc-800 ">
        <form
          onSubmit={handleSubmit}
          className="flex-col  shadow-2xl shadow-zinc-700 bg-neutral-900 rounded-3xl h-fit p-4 max-w-fit   hover:border border-slate-700"
        >
          <p className="text-center text-2xl p-3 font-mono"> Add Department</p>
          <div className="flex flex-col justify-around p-2">
            <label className=" mb-1">Department : </label>

            <input
              className="rounded-xl max-w-fit text-lg bg-zinc-900 border border-zinc-700 text-center"
              type="text"
              name="department"
              placeholder="Department Name "
              value={department}
              required
              onChange={(e) => setDepartment(e.target.value)}
              autoComplete="off"
            />
            <div className="p-4 pb-2  flex flex-rol place-content-around">
              <button
                className="rounded-md bg-zinc-700 p-2 hover:bg-black"
                type="submit"
              >
                Add
              </button>
              <button
                className="rounded-md bg-zinc-700 p-2 hover:bg-black"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDepartment;
