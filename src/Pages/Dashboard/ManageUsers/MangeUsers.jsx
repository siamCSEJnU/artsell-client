import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import useAllUsers from "../../../Hooks/useAllUsers";
import Loader from "../../../Components/Loader/Loader";
import adminIcon from "../../../assets/icons/admin3.png";
import removeIcon from "../../../assets/icons/delete1.png";
import Swal from "sweetalert2";
import useAdmin from "../../../Hooks/useAdmin";

const MangeUsers = () => {
  const [allUsers, isLoadingUsers, refetch] = useAllUsers();
  const [isAdmin] = useAdmin();

  if (isLoadingUsers) {
    return <Loader></Loader>;
  }
  //   console.log(allUsers);
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://artsell-server-siamcsejnu.vercel.app/users/admin/${user._id}`,
          {
            method: "PATCH",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is Admin now!!`,
                showConfirmButton: false,
                timer: 1800,
              });
            }
          });
      }
    });
  };
  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://artsell-server-siamcsejnu.vercel.app/allUsers/delete/${userId}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The User has been deleted successfully",
                showConfirmButton: false,
                timer: 1800,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              timer: 2000,
              text: `Something went wrong while deleting the ArtWork! Error :${
                error ? error.message : ""
              }`,
            });
          });
      }
    });
  };
  return (
    <div>
      <Helmet>ArtSell | Dashboard | MangeUsers</Helmet>
      <SectionTitle heading={`Total Users : ${allUsers.length}`}></SectionTitle>
      <div className="overflow-x-auto mr-5 mb-16">
        <table className="table">
          <thead className="bg-slate-200 text-slate-900 ">
            <tr className="text-center text-lg">
              <th>#</th>
              <th>Users</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin</th>
              <th>Remove User</th>
            </tr>
          </thead>
          <tbody className="text-center bg-slate-900  text-slate-200">
            {allUsers?.map((user, index) => (
              <tr key={user?._id}>
                <td className="text-lg font-semibold">{index + 1}</td>
                <td>
                  <div className="flex  items-center gap-6">
                    <img
                      src={user?.photoURL}
                      className="h-14 w-14 object-cover rounded-lg"
                      alt=""
                    />
                    <div className="text-lg font-semibold">
                      <h2>{user?.name || user.userName}</h2>
                    </div>
                  </div>
                </td>
                <td className="text-lg ">{user.email}</td>
                <td
                  className={`text-lg  ${
                    user.role == "admin" ? " font-bold text-lime-500" : ""
                  }`}
                >
                  {user.role}
                </td>
                <td className="text-center cursor-pointer">
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    disabled={user?.role == "admin"}
                    className={`${user?.role == "admin" && "opacity-40"}`}
                  >
                    <img src={adminIcon} className="h-8" alt="" />
                  </button>
                </td>
                <td className="text-center">
                  <button onClick={() => handleDeleteUser(user._id)}>
                    {" "}
                    <img src={removeIcon} className="h-8" alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MangeUsers;
