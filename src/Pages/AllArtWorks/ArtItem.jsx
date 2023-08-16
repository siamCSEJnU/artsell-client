import ownerIcon from "../../assets/icons/owner.png";
import priceIcon from "../../assets/icons/price.png";
import categoryIcon from "../../assets/icons/category1.png";
import Loader from "../../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
const ArtItem = ({ item }) => {
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
  const {
    art_name,
    art_img_url,
    base_price,
    bidding_status,
    category,
    description,
    date_of_upload,
    owner_email,
    owner_name,
    status,
    validity,
    _id,
  } = item;
  return (
    <div>
      <div className="bg-slate-200  group rounded-lg p-2 flex flex-col ">
        <div className="flex-grow space-y-1">
          <img
            src={art_img_url}
            alt=""
            className=" rounded-md h-56 w-full object-cover hover:h-full hover:w-full"
          />
          <h2 className="text-xl font-semibold text-slate-900">{art_name}</h2>
        </div>
        <div className="py-2 space-y-2 flex-grow">
          <div className="flex items-center gap-2">
            <img className="h-5" src={ownerIcon} alt="" />
            <h3 className="text-slate-700"> {owner_name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <img src={categoryIcon} className="h-5" alt="" />
            <h3 className="text-lg text-orange-500"> {category}</h3>
          </div>
          <div className="flex items-center gap-2">
            <img src={priceIcon} className="h-5" alt="" />
            <h3 className="text-lg font-semibold text-slate-950">
              {base_price}$
            </h3>
          </div>
        </div>
        <div>
          <button
            onClick={handleSelect}
            className="btn w-full bg-slate-700 text-slate-200 hover:bg-orange-400"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtItem;
