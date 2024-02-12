// import React from "react";

// const FormDiv = ({ data }) => {
//   const divData = {
//     label: data.label,
//     name: data.name,
//     placeholder: data.placeholder,
//     value: data.value,
//     fun: data.fun,
//     err: data.err,
//   };
//   return (
//     <>
//       <div className="flex  flex-col ">
//         <div className="flex gap-x-14    ">
//           <label className="">{divData.label} :</label>

//           <input
//             className="rounded-xl flex-1 bg-zinc-900 border border-zinc-700 indent-3 "
//             type="text"
//             name={divData.name}
//             placeholder={divData.placeholder}
//             value={divData.value}
//             onChange={(e) => divData.fun(e)}
//             autoComplete="off"
//           />
//         </div>
//         <div className="text-red-700 text-sm p-1 flex justify-center">
//           {divData.err && <p className="">*{divData.err}</p>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default FormDiv;

// const [formData, setFormData] = useState({
//   name: "Test",
// });
// const handleChange = (e) => {
//   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// };
// const dataProp = {
//   label: "Test",
//   name: "name",
//   placeholder: "Place",
//   value: formData.name,
//   fun: handleChange,
//   err: "error",
// };

// <FormDiv data={dataProp} />
