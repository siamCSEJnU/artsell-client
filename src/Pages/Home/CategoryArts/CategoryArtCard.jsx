import ownerIcon from "../../../assets/icons/owner.png";
import priceIcon from "../../../assets/icons/price.png";
import categoryIcon from "../../../assets/icons/category1.jpg";
import { Link } from "react-router-dom";

const CategoryArtCard = ({ item }) => {
  const { art_img_url, art_name, owner_name, category, base_price } = item;
  return (
    <div className="bg-slate-200 w-80 flex flex-col rounded-md p-2 space-y-2">
      <div className="flex-grow space-y-1">
        <img
          src={art_img_url}
          className="rounded-md h-56 w-full object-cover opacity-95 hover:brightness-110 "
          alt=""
        />
        <h2 className="text-xl font-semibold text-slate-900">{art_name}</h2>
      </div>
      <div className="flex-grow space-y-2">
        <div className="flex items-center gap-3">
          <img src={ownerIcon} className="h-6" alt="" />
          <h3 className="text-slate-900 text-lg">{owner_name}</h3>
        </div>
        <div className="flex items-center gap-3">
          <img src={categoryIcon} className="h-5" alt="" />
          <h3 className="text-slate-700 font-semibold">{category}</h3>
        </div>

        <div className="flex items-center gap-3">
          <img src={priceIcon} className="h-5" alt="" />
          <h3 className="text-lg font-semibold text-slate-950">
            {base_price} $
          </h3>
        </div>
      </div>
      <div className="pt-2 pb-1">
        <Link to={`/allArtWorks/${item?._id}`}>
          <button className="btn w-full bg-slate-700 text-slate-200 hover:bg-orange-400">
            View Details
          </button>
        </Link>
      </div>
    </div>
    // <div>
    //   <div className="bg-slate-200   w-72 group rounded-lg p-2 flex flex-col ">
    //     <div className="flex-grow space-y-1">
    //       <img
    //         src={art_img_url}
    //         alt=""
    //         className=" rounded-md w-full h-56  object-cover "
    //       />
    //       <h2 className="text-xl font-semibold text-slate-900">{art_name}</h2>
    //     </div>
    //     <div className="py-2 space-y-2 flex-grow">
    //   <div className="flex items-center gap-3">
    //     <img className="h-5" src={ownerIcon} alt="" />
    //     <h3 className="text-slate-700"> {owner_name}</h3>
    //   </div>
    //   <div className="flex items-center gap-3">
    //     <img src={categoryIcon} className="h-5" alt="" />
    //     <h3 className="text-lg text-orange-500"> {category}</h3>
    //   </div>
    //   <div className="flex items-center gap-3">
    //     <img src={priceIcon} className="h-5" alt="" />
    //     <h3 className="text-lg font-semibold text-slate-950">
    //       {base_price} $
    //     </h3>
    //   </div>
    //     </div>
    //     <div className="pt-1">
    //   <Link to={`/allArtWorks/${item?._id}`}>
    //     <button className="btn w-full bg-slate-700 text-slate-200 hover:bg-orange-400">
    //       View Details
    //     </button>
    //   </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CategoryArtCard;
