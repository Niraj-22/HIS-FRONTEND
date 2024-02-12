import { useState } from "react";
import { toast } from "react-toastify";
import loginValidator from "../../validators/loginValidator";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialFormData = {
    password: "",
    email: "",
  };
  const initialFormError = {
    password: "",
    email: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = loginValidator({
      email: formData.email,
      password: formData.password,
    });

    if (errors.email || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        // api request

        const response = await axios.post("/auth/login", formData);
        const data = response.data;
        const user = {
          roleId: data.roleId,
          token: data.token,
          id: data.id,
        };
        window.localStorage.setItem("User", JSON.stringify(user));
        toast.success("Login Successfully", {
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.log(error);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          autoClose: true,
        });
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen text-slate-300 bg-zinc-800 ">
        <form
          onSubmit={handleSubmit}
          className="flex-col shadow-2xl shadow-zinc-700 bg-neutral-900 rounded-3xl h-fit p-4 max-w-fit   hover:border border-slate-700"
        >
          <p className="text-center text-2xl p-4 font-mono"> Login</p>
          <div className="flex flex-col justify-center p-2">
            <label className=" mb-1">Email </label>

            <input
              className="rounded-xl max-w-fit bg-zinc-900 border border-zinc-700 text-center"
              type="email"
              name="email"
              placeholder="doe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <div className="text-red-700 text-xs p-1">
              {formError.email && <p className="">*{formError.email}</p>}
            </div>
          </div>
          <div className="flex flex-col justify-center p-2">
            <label className=" mb-1">Password </label>

            <input
              className="rounded-xl max-w-fit bg-zinc-900 border border-zinc-700 text-center"
              type="password"
              name="password"
              placeholder="***********"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="text-red-700 text-xs p-1">
              {formError.password && <p className="">*{formError.password}</p>}
            </div>
          </div>
          <div className="p-2 flex flex-rol place-content-around">
            <button
              className="rounded-md bg-zinc-700 p-1 hover:bg-black"
              type="submit"
              value={`${loading ? "Login in ...." : "Login"}`}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
