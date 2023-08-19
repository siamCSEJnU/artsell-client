import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAllArtWorks from "../../../Hooks/useAllArtWorks";
import Loader from "../../../Components/Loader/Loader";
import edit from "../../../assets/icons/edit3.png";
import deleteIcon from "../../../assets/icons/delete3.png";
import bid from "../../../assets/icons/bid3.png";
import { useState } from "react";
import BiddersModal from "./BiddersModal";
import EditArts from "./EditArts";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyArts = () => {
  const { user, loading } = useAuth();
  const [allArtWorks, isLoading, refetch] = useAllArtWorks();
  const [showBiddersModal, setShowBiddersModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [artWork, setArtWork] = useState({});
  const [bidders, setBidders] = useState([]);
  if (loading || isLoading) {
    return <Loader></Loader>;
  }
  const myArtWorks = allArtWorks?.filter(
    (item) => item.owner_email == user?.email
  );
  const handleOnClose = () => {
    setShowBiddersModal(false);
    setBidders([]);
  };
  const handleEditModalClsoe = () => {
    setShowEditModal(false);
    setArtWork({});
  };

  const openBiddersModal = (bidders) => {
    setBidders(bidders);
    setShowBiddersModal(true);
  };
  const openEditArtModal = (artWork) => {
    setArtWork(artWork);
    setShowEditModal(true);
  };
  const handleDelete = (Id) => {
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
        fetch(`http://localhost:5000/allArtWorks/delete/${Id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "This class has been deleted successfully",
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
      <Helmet>
        {" "}
        <title>ArtSell | Dashboard | MyArts</title>
      </Helmet>
      <SectionTitle heading={"My Arts"}></SectionTitle>
      <div className="overflow-x-auto mr-5 ">
        <table className="table">
          <thead className="bg-slate-800 text-slate-300 ">
            <tr className="text-center text-lg">
              <th>#</th>
              <th>Arts</th>
              <th>Validity/days</th>
              <th>Status</th>
              <th>Base Price</th>
              <th>Bidding Status</th>
              <th>Best Price</th>
              <th> Bidders</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center bg-slate-200  text-slate-900">
            {myArtWorks?.map((item, index) => (
              <tr key={item._id}>
                <td className="text-lg font-semibold">{index + 1}</td>
                <td>
                  <Link to={`/allArtWorks/${item._id}`}>
                    {" "}
                    <div className="flex  items-center gap-3">
                      <img
                        src={item?.art_img_url}
                        className="h-14 w-14 object-cover rounded-lg"
                        alt=""
                      />
                      <div className="text-lg font-semibold">
                        <h2>{item?.art_name}</h2>
                      </div>
                    </div>
                  </Link>
                </td>

                <td className="text-lg">{item?.validity}</td>
                <td
                  className={`font-semibold text-lg ${
                    item.status == "accepted"
                      ? "text-indigo-500"
                      : item.status == "pending"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item?.status}
                </td>
                <td className="text-lg">${item?.base_price}</td>
                <td
                  className={`text-lg ${
                    item?.bidding_status == "on"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item?.bidding_status}
                </td>
                <td className="text-lg">
                  {item && item.bidding_info && item.bidding_info.length > 0
                    ? `$${Math.max(
                        ...item.bidding_info.map((i) =>
                          parseFloat(i.bidding_amount)
                        )
                      ).toFixed(2)}`
                    : "n/a"}
                </td>

                <td>
                  <div
                    onClick={() => openBiddersModal(item.bidding_info || [])}
                    className="relative"
                  >
                    <button>
                      <img src={bid} className="h-8" alt="" />
                    </button>
                    <div className="absolute bottom-5 right-0 w-6 h-6 rounded-full bg-lime-600 text-slate-900 font-semibold flex items-center justify-center">
                      <h2>
                        {item && item.bidding_info
                          ? item.bidding_info.length
                          : "0"}
                      </h2>
                    </div>
                  </div>
                </td>

                <td>
                  <button onClick={() => openEditArtModal(item)}>
                    <img src={edit} className="h-8" alt="" />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item._id)}>
                    <img src={deleteIcon} className="h-8" alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <BiddersModal
          handleOnClose={handleOnClose}
          visible={showBiddersModal}
          bidders={bidders}
        ></BiddersModal>
        <EditArts
          artWork={artWork}
          handleEditModalClsoe={handleEditModalClsoe}
          visible={showEditModal}
        ></EditArts>
      </div>
    </div>
  );
};

export default MyArts;
