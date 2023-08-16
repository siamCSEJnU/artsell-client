import { useForm } from "react-hook-form";
import auction from "../../assets/icons/bid2.png";

import { toast } from "react-toastify";
import { useState } from "react";
import { ImSpinner4 } from "react-icons/im";
const BiddingModal = ({ visibile, handleOnClose, selectedArt, user }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  console.log(selectedArt);

  if (!visibile) return null;

  const handleSubmitAmount = (data) => {
    setSubmitLoading(true);
    const { bidding_amount, bidder_location, bidder_email } = data;
    const updateBiddingInfo = {
      bidder_name: user?.displayName,
      bidder_img: user?.photoURL,
      bidder_email,
      bidder_location,
      bidding_amount,
    };
    fetch(`http://localhost:5000/updateBiddingInfo/${selectedArt._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateBiddingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          reset();
          setSubmitLoading(false);
          handleOnClose();
          toast.success("Bidding Info updated successfuly", {
            autoClose: 1500,
            position: "top-center",
            // theme: "dark",
          });
        }
      });
  };
  return (
    <div className="fixed inset-0 bg-slate-950  bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="text-slate-900 bg-slate-200  rounded-md  p-3">
        <div className="flex items-center justify-center gap-1 pb-3">
          <img src={auction} className="h-9" alt="" />
          <h2 className="text-slate-900 text-2xl  font-bold"> BID Here!</h2>
        </div>

        <form onSubmit={handleSubmit(handleSubmitAmount)} className="space-y-3">
          <div className="text-lg  space-y-1">
            <label htmlFor="biddingAmount " className="font-semibold">
              Amount
            </label>
            <input
              type="text"
              className="px-3 py-2 border-0 outline-0 rounded-md w-full"
              placeholder="Enter your amount"
              {...register("bidding_amount", {
                required: "Bidding amount is required",
              })}
            />
            {errors?.bidding_amount && (
              <p className="text-red-500 text-sm">
                {errors.bidding_amount.message}
              </p>
            )}
          </div>
          <div className="text-lg  space-y-1">
            <label htmlFor="bidderLocation" className="font-semibold">
              Bidder's Location
            </label>
            <input
              type="text"
              className="px-3 py-2 border-0 outline-0 rounded-md w-full"
              placeholder="Your's Location"
              {...register("bidder_location", {
                required: "Bidder's location is required",
              })}
            />
            {errors?.bidder_location && (
              <p className="text-red-500 text-sm">
                {errors.bidder_location.message}
              </p>
            )}
          </div>
          <div className="text-lg  space-y-1">
            <label htmlFor="bidder_email " className="font-semibold">
              Bidder's Email
            </label>
            <input
              type="text"
              className="px-3 py-2 border-0 outline-0 rounded-md w-full"
              placeholder="Your's Email"
              defaultValue={user?.email}
              {...register("bidder_email", {
                required: "Bidder's email is required",
              })}
            />
            {errors?.bidder_email && (
              <p className="text-red-500 text-sm">
                {errors.bidder_email.message}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleOnClose}
              className="bg-red-800 px-3 py-2 rounded-md hover:bg-lime-500 text-slate-100 text-lg font-semibold"
            >
              {" "}
              Close
            </button>
            <button
              type="submit"
              className="bg-lime-600 px-3 py-2 rounded-md hover:bg-slate-900 text-slate-100 text-lg font-semibold"
            >
              {submitLoading ? (
                <ImSpinner4
                  className="animate-spin m-auto text-slate-200"
                  size={32}
                ></ImSpinner4>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BiddingModal;
