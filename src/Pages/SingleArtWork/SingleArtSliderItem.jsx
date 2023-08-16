import React from "react";
import category from "../../assets/icons/category1.jpg";
import { Link } from "react-router-dom";

const SingleArtSliderItem = ({ item }) => {
  return (
    <div
      style={{ height: "350px" }}
      className="text-slate-200 flex flex-col bg-slate-800 group  w-72 space-y-2 p-2"
    >
      <div className="flex-grow">
        {" "}
        <img
          src={item.art_img_url}
          className="h-48 w-full object-cover group-hover:brightness-110"
          alt=""
        />
        <h2 className="text-xl">{item.art_name}</h2>
      </div>
      <div className="flex-grow ">
        <div className="flex items-center gap-2 ">
          <img src={category} className="h-6" alt="" />
          <h4
            className="text-lg text-lime-600 tooltip tooltip-right"
            data-tip="category"
          >
            {item?.category}
          </h4>
        </div>
      </div>
      <div className=" text-center pt-2 pb-1 ">
        {" "}
        <Link to={`/allArtWorks/${item._id}`}>
          {" "}
          <button className="px-3 py-1 font-semibold rounded-md bg-slate-200 text-slate-900">
            view details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleArtSliderItem;
