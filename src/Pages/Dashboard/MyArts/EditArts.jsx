import { useState } from "react";
import { ImSpinner4 } from "react-icons/im";
import Swal from "sweetalert2";
import useAllArtWorks from "../../../Hooks/useAllArtWorks";

const EditArts = ({ artWork, visible, handleEditModalClsoe }) => {
  const [loading, setLoading] = useState(false);
  const [, , refetch] = useAllArtWorks();

  const handleUpdateArtWork = (event) => {
    event.preventDefault();
    setLoading(true);

    const updatedArt = {
      art_name: event.target.title.value,
      base_price: parseFloat(event.target.basePrice.value),
      owner_name: event.target.ownerName.value,
      owner_email: event.target.ownerEmail.value,
      owner_location: event.target.location.value,
      art_size: event.target.size.value,
      bidding_status: event.target.biddingStatus.value,
      description: event.target.description.value,
      validity: parseInt(event.target.validity.value),
    };

    fetch(
      `https://artsell-server-siamcsejnu.vercel.app/allArtWorks/update/${artWork._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedArt),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();

          setLoading(false);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "ArtWork has been updated successfully!!",
            showConfirmButton: false,
            timer: 1800,
          });
          handleEditModalClsoe();
        }
      });
  };

  if (!visible) return null;

  return (
    <div className=" fixed bg-opacity-20 backdrop-blur-sm inset-0 bg-slate-800   flex justify-center items-center ">
      <div className="bg-slate-300 p-5 w-5/12 mx-auto rounded-lg first-line: ">
        <h2 className="text-slate-800 font-bold text-2xl mb-5 text-center">
          Update Your ArtWork!!
        </h2>
        <form onSubmit={handleUpdateArtWork} className="space-y-2">
          <div className="flex justify-between ">
            <div className="space-y-1 w-2/5 ">
              <label
                htmlFor="title"
                className="text-lg font-semibold text-slate-800"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={artWork.art_name}
                placeholder="Name your artwork"
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
              />
            </div>
            <div className="space-y-1 w-2/5">
              {" "}
              <label
                htmlFor="basePrice"
                className="text-lg font-semibold text-slate-800"
              >
                Base Price
              </label>
              <input
                type="number"
                name="basePrice"
                placeholder="Set base price "
                defaultValue={artWork.base_price}
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="space-y-1 w-2/5">
              <label
                htmlFor="ownerName"
                className="text-lg font-semibold text-slate-800"
              >
                Owner's Name
              </label>
              <input
                type="text"
                name="ownerName"
                placeholder="Place the name of the owner"
                defaultValue={artWork?.owner_name}
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
              />
            </div>
            <div className="space-y-1 w-2/5">
              <label
                htmlFor="ownerEmail"
                className="text-lg font-semibold text-slate-800"
              >
                Owner's Email
              </label>
              <input
                type="email"
                name="ownerEmail"
                placeholder="Email of the owner"
                defaultValue={artWork.owner_email}
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
              />
            </div>
          </div>
          <div className="flex justify-between ">
            <div className="w-2/5 space-y-1">
              <label
                htmlFor="ownerLocation"
                className="text-lg font-semibold text-slate-800"
              >
                Owner's Location
              </label>
              <input
                type="text"
                name="location"
                list="locationSuggestions"
                placeholder="Location of the owner"
                defaultValue={artWork.owner_location}
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
              />
              <datalist id="locationSuggestions">
                <option value="United Kingdom" />
                <option value="United States" />
                <option value="Bangladesh" />
                <option value="India" />
                <option value="Australia" />
                {/* Add more location suggestions as needed */}
              </datalist>
            </div>
            <div className="w-2/5 space-y-1">
              <label
                htmlFor="artSize"
                className="text-lg font-semibold text-slate-800"
              >
                Art's Size
              </label>
              <input
                type="text"
                name="size"
                placeholder="Size of the art"
                defaultValue={artWork.art_size}
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="space-y-1 w-2/5">
              <label
                htmlFor="biddingStatus"
                className="text-lg font-semibold text-slate-800 border-0 outline-0"
              >
                Bidding Status
              </label>
              <input
                type="text"
                name="biddingStatus"
                defaultValue={artWork.bidding_status}
                placeholder="Bidding Status"
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
              />
            </div>
            <div className="space-y-1 w-2/5">
              <label
                htmlFor="validity"
                className="text-lg font-semibold text-slate-800"
              >
                Validity
              </label>
              <input
                type="number"
                name="validity"
                placeholder="Set days of validity "
                defaultValue={artWork.validity}
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="description"
              className="text-lg font-semibold text-slate-800"
            >
              Description
            </label>
            <textarea
              type="text"
              rows={4}
              name="description"
              placeholder="Describe about the artwork "
              defaultValue={artWork.description}
              className="w-full px-3 py-2 rounded-md border-0 outline-0 "
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleEditModalClsoe}
              className="btn bg-lime-600 border-0 outline-0  "
            >
              Close
            </button>
            <button
              type="submit"
              className="btn  hover:bg-lime-600 hover:text-slate-800 hover:border-lime-600  text-slate-200 bg-slate-800 border-slate-800"
            >
              {loading ? (
                <ImSpinner4
                  className="animate-spin m-auto text-slate-200"
                  size={32}
                ></ImSpinner4>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArts;
