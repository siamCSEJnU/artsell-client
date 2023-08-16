import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SingleArtSliderItem from "./SingleArtSliderItem";
const SingleArtSlider = ({ ownerArts }) => {
  // console.log(ownerArts);
  const settings = {
    // className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
  };
  return (
    <div className="bg-slate-900 bg-opacity-75 p-3 mt-5">
      <Slider {...settings} className=" w-5/12 mx-auto">
        {ownerArts?.map((item) => (
          <SingleArtSliderItem key={item._id} item={item}></SingleArtSliderItem>
        ))}
      </Slider>
    </div>
  );
};

export default SingleArtSlider;
