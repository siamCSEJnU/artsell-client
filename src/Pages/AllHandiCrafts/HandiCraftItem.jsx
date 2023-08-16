import crafter from "../../assets/icons/crafter1.png";
import bid from "../../assets/icons/bid1.png";
import size from "../../assets/icons/size1.png";
import React from "react";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const HandiCraftItem = ({ item }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return <Loader></Loader>;
  }

  const handleSelect = () => {
    if (user) {
      return navigate(`/allArtWorks/${item._id}`);
    } else {
      Swal.fire({
        title: "Please login to select the Art",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result?.isConfirmed) {
          navigate(`/allArtWorks/${item._id}`);
        }
      });
    }
  };
  return (
    <div className="bg-orange-200 shadow-sm  flex flex-col rounded-md p-2 space-y-2">
      <div className="flex-grow space-y-1">
        <img
          src={item.art_img_url}
          className="rounded-md h-56 w-full object-cover opacity-95 hover:brightness-110 "
          alt=""
        />
        <h2 className="text-xl font-semibold text-slate-900">
          {item.art_name}
        </h2>
      </div>
      <div className="flex-grow space-y-2">
        <div className="flex items-center gap-2">
          <img src={crafter} className="h-6" alt="" />
          <h3 className="text-slate-600">{item.owner_name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <img src={size} className="h-6" alt="" />
          <h3 className="text-slate-800 text-lg">
            {item.art_size ? item.art_size : "200w x 200h"}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <img src={bid} className="h-6" alt="" />
          <h3 className="text-lg text-slate-950">${item.base_price}</h3>
        </div>
      </div>
      <div className="pt-2 pb-1">
        <button
          onClick={handleSelect}
          className="w-full btn border-0 outline-0 text-slate-200  bg-slate-700 hover:bg-orange-400 hover:text-slate-200"
        >
          select for BIDding
        </button>
      </div>
    </div>
  );
};

export default HandiCraftItem;
