import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const TopArtistSlider = ({ topArtists }) => {
  console.log(topArtists);
  return (
    <div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {topArtists?.map((item) => (
          <SwiperSlide key={item?._id}>
            <Link to={`/allArtists/${item?._id}`}>
              {" "}
              <img
                src={item?.photoURL}
                className="h-80 w-80 object-cover"
                alt=""
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopArtistSlider;
