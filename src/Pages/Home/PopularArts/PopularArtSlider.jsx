import React, { useRef, useState } from "react";
import bid from "../../../assets/icons/bid1.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import useAllUsers from "../../../Hooks/useAllUsers";
import Loader from "../../../Components/Loader/Loader";
import { Link } from "react-router-dom";

const PopularArtSlider = ({ popularArtWorks }) => {
  const [allUsers, isLoadingUsers, refetch] = useAllUsers();
  console.log(popularArtWorks);
  if (isLoadingUsers && !allUsers) return <Loader></Loader>;
  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {popularArtWorks?.map((item) => (
          <SwiperSlide key={item?._id}>
            <Link to={`/allArtWorks/${item?._id}`}>
              <div
                className="space-y-3 bg-slate-800 p-2 text-slate-100"
                style={{ height: "320px", width: "300px" }}
              >
                <img
                  src={item?.art_img_url}
                  style={{ height: "200px", width: "300px" }}
                  alt=""
                />
                <div className="flex items-center gap-5 ">
                  <img
                    src={
                      allUsers?.find((user) => user?.email == item?.owner_email)
                        ?.photoURL
                    }
                    className="  rounded-full object-cover "
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                  <h2 className="text-xl font-semibold ">{item?.owner_name}</h2>
                </div>
                <div className="text-center text-lg">
                  <p>
                    Total Bidders :{" "}
                    {item?.bidding_info ? item?.bidding_info?.length : "0"}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularArtSlider;
