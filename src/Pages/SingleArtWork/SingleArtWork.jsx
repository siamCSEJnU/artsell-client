import { useParams } from "react-router-dom";
import useAllArtWorks from "../../Hooks/useAllArtWorks";
import Container from "../../Components/Container/Container";
import useAllUsers from "../../Hooks/useAllUsers";
import category from "../../assets/icons/category1.jpg";
import description from "../../assets/icons/description2.jpg";
import size from "../../assets/icons/size3.jpg";
import validity from "../../assets/icons/validity.png";
import price from "../../assets/icons/price.png";
import top from "../../assets/icons/top1.png";

import { useState } from "react";
import Loader from "../../Components/Loader/Loader";
import SingleArtSlider from "./SingleArtSlider";
import BiddingModal from "./BiddingModal";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";

const SingleArtWork = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin] = useAdmin();
  const { user } = useAuth();

  const handleOnClose = () => {
    setShowModal(false);
  };

  const { id } = useParams();
  const [allArtWorks, isLoading] = useAllArtWorks();
  const [allUsers, isLoadingUsers] = useAllUsers();
  if (isLoadingUsers || isLoading) {
    return <Loader></Loader>;
  }

  const selectedArt = allArtWorks?.find((item) => item?._id == id);
  const bidders = selectedArt?.bidding_info;
  // console.log(bidders);
  const selectedOwnerPhoto =
    !isLoadingUsers &&
    selectedArt &&
    allUsers?.find((item) => item?.email === selectedArt?.owner_email)
      ?.photoURL;

  const ownerArts = allArtWorks
    ?.filter((item) => item.owner_email == selectedArt.owner_email)
    .filter((item) => item._id !== id);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  // console.log(selectedArt);

  return (
    <Container>
      {" "}
      <div className="my-24 ">
        <div className="flex bg-slate-800 p-5 gap-10">
          <div className="w-1/2 text-slate-100">
            <img src={selectedArt?.art_img_url} alt="" />
            <div className="flex gap-2 pt-6">
              <img src={description} className="h-6" alt="" />
              <p className="flex-wrap">
                {showFullDescription
                  ? selectedArt?.description
                  : selectedArt?.description?.slice(0, 100)}
                {selectedArt?.description?.length > 100 && (
                  <button className="text-lime-600" onClick={toggleDescription}>
                    {showFullDescription ? "Read less" : "...Read more"}
                  </button>
                )}
              </p>
            </div>
          </div>
          <div className="text-slate-100 space-y-3 w-1/2">
            <div className=" ">
              <h2 className="text-3xl">{selectedArt?.art_name}</h2>
              <h3 className="text-sm pt-1">({selectedArt?.date_of_upload})</h3>
            </div>
            <div className="flex items-center gap-3 ">
              <img
                src={selectedOwnerPhoto}
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
              <div>
                <h3 className="text-lg ">{selectedArt?.owner_name}</h3>
                <h3 className="italic text-sm">
                  {selectedArt?.location
                    ? selectedArt?.location
                    : "United States"}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 ">
              <img src={category} className="h-6" alt="" />
              <h4
                className="text-lg text-lime-600 tooltip tooltip-right"
                data-tip="category"
              >
                {selectedArt?.category}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <img src={size} className="h-6" alt="" />
              <h3
                className="text-lime-600 text-lg tooltip tooltip-right"
                data-tip="size"
              >
                {selectedArt.art_size ? selectedArt.art_size : "200w x 200h"}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <img src={validity} className="h-6" alt="" />
              <h4
                className="text-lg text-lime-600 tooltip tooltip-right"
                data-tip="validity"
              >
                {selectedArt?.validity} days
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <img src={price} className="h-6" alt="" />
              <div className="flex items-center gap-2">
                {" "}
                <h4 className="text-lg ">${selectedArt?.base_price}</h4>
                <button
                  disabled={
                    selectedArt.validity === 0 ||
                    selectedArt.bidding_status == "off" ||
                    isAdmin
                  }
                  onClick={() => setShowModal(true)}
                  className={` px-2 py-1 rounded-md bg-lime-600   font-semibold text-slate-900 ${
                    selectedArt.validity === 0 ||
                    selectedArt.bidding_status == "off" ||
                    isAdmin
                      ? "bg-opacity-50"
                      : " hover:bg-slate-200 "
                  }`}
                >
                  {selectedArt.validity === 0 ||
                  selectedArt.bidding_status == "off" ||
                  isAdmin
                    ? "Unavailable"
                    : "BID"}
                </button>
              </div>
            </div>
            <div className="w-1/2 p-3 text-slate-100 mx-auto bg-slate-900 bg-opacity-80">
              <div className="flex items-center gap-2">
                <img src={top} className="h-8 " alt="" />
                <h2 className=" text-xl">Top Bidders</h2>
              </div>
              <div>
                {bidders &&
                  bidders.map((bidder) => (
                    <div
                      className="flex items-center gap-10 space-y-5"
                      key={bidder.bidder_email}
                    >
                      <p className="pt-3">${bidder.bidding_amount}</p>
                      <div className="flex items-center gap-2">
                        <img
                          src={bidder.bidder_img}
                          className="h-11 w-11 object-cover rounded-full"
                          alt=""
                        />
                        <div className="">
                          <h3 className="">{bidder.bidder_name}</h3>
                          <h4 className="text-sm">{bidder.bidder_location}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <BiddingModal
              handleOnClose={handleOnClose}
              visible={showModal}
              selectedArt={selectedArt}
              user={user}
            ></BiddingModal>
          </div>
        </div>
        <div className="mt-12 ">
          <div className="flex items-center justify-center gap-3    ">
            <img
              src={selectedOwnerPhoto}
              className="h-16 w-16 rounded-full   object-cover"
              alt=""
            />
            <h2 className="text-2xl text-slate-800 font-semibold  ">
              More From {selectedArt.owner_name}{" "}
            </h2>
          </div>
          <div>
            <SingleArtSlider ownerArts={ownerArts}></SingleArtSlider>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleArtWork;
