import Swal from "sweetalert2";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
const handleDelete = (i) => {
  const id = i;
  Swal.fire({
    title: "Are you sure?",
    width: 400,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`/admin/delete-user/${id}`);
        if (response.data) {
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
          window.location.reload();
        } else {
          toast.error("User Deletion Failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
};

export default handleDelete;
