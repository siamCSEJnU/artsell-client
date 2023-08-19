import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import useAllArtWorks from "../../../Hooks/useAllArtWorks";
import acceptIcon from "../../../assets/icons/accept3.png";
import denyIcon from "../../../assets/icons/deny2.png";
import useAllUsers from "../../../Hooks/useAllUsers";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MangeArts = () => {
  const [allArtWorks, isLoading, refetch] = useAllArtWorks();
  const [allUsers, isLoadingUsers] = useAllUsers();
  const handleAccept = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/allArtWorks/accept/${id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `The ArtWork is accepted!!`,
                showConfirmButton: false,
                timer: 1700,
              });
            }
          });
      }
    });
  };
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/allArtWorks/reject/${id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `The ArtWork is rejected!!`,
                showConfirmButton: false,
                timer: 1700,
              });
            }
          });
      }
    });
  };
  return (
    <div>
      <Helmet>ArtSell | Dashboard | ManageArts</Helmet>
      <SectionTitle
        heading={`Total ArtWorks ${allArtWorks.length}`}
      ></SectionTitle>
      <div className="overflow-x-auto mr-5 mb-16">
        <table className="table">
          <thead className="bg-slate-900 text-slate-300 ">
            <tr className="text-center text-lg">
              <th>Date</th>
              <th>Arts</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Validity</th>
              <th>Base Price</th>
              <th>Bidding Status</th>
              <th>Status</th>
              <th>Accept</th>
              <th>Deny</th>
            </tr>
          </thead>
          <tbody className="text-center text-lg bg-slate-200  text-slate-800">
            {allArtWorks?.map((item) => (
              <tr key={item._id}>
                <td className="font-semibold ">{item.date_of_upload}</td>
                <td
                  className="flex items-center justify-center tooltip tooltip-top "
                  data-tip="view details"
                >
                  <Link to={`/allArtWorks/${item._id}`}>
                    {" "}
                    <img
                      src={item?.art_img_url}
                      className="h-16 w-16 object-cover rounded-lg"
                      alt=""
                    />
                  </Link>
                </td>
                <td className="font-semibold ">{item.category}</td>
                <td
                  className="flex items-center justify-center tooltip tooltip-top"
                  data-tip="view details"
                >
                  {" "}
                  <img
                    src={
                      allUsers.find((user) => user.email == item.owner_email)
                        .photoURL
                    }
                    className="h-16 w-16 object-cover rounded-full"
                    alt=""
                  />
                </td>
                <td className="font-semibold">{item.validity}</td>
                <td className="font-semibold">${item.base_price}</td>
                <td
                  className={`font-semibold ${
                    item?.bidding_status == "on"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.bidding_status}
                </td>
                <td
                  className={` ${
                    item.status === "accepted"
                      ? "font-bold"
                      : item.status === "denied"
                      ? "text-red-600 font-bold"
                      : ""
                  }`}
                >
                  {item.status}
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => handleAccept(item._id)}
                    disabled={
                      item.status === "denied" || item.status === "accepted"
                    }
                    className={`${
                      item.status === "accepted" || item.status === "denied"
                        ? "opacity-30"
                        : ""
                    }`}
                  >
                    <img src={acceptIcon} className="h-7" alt="" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleReject(item._id)}
                    disabled={
                      item.status === "denied" || item.status === "accepted"
                    }
                    className={`${
                      item.status === "denied" || item.status === "accepted"
                        ? "opacity-30"
                        : ""
                    }`}
                  >
                    <img src={denyIcon} className="h-7" alt="" />
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

export default MangeArts;
