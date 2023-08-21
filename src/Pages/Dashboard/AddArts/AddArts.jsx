import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { ImSpinner4 } from "react-icons/im";

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddArts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const handleUploadArts = (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", data.artImage[0]);
    fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        if (imageResponse.success) {
          const imgURL = imageResponse.data.display_url;
          // console.log(imgURL);
          const {
            title,
            basePrice,
            ownerEmail,
            ownerName,
            date,
            description,
            validity,
            category,
            location,
            size,
          } = data;
          const bidding_info = [];
          const newArt = {
            art_name: title,
            art_img_url: imgURL,
            base_price: parseFloat(basePrice),
            owner_name: ownerName,
            owner_email: ownerEmail,
            owner_location: location,
            art_size: size,
            date_of_upload: date,
            description,
            category,
            validity,
            bidding_status: "on",
            bidding_info,
            status: "pending",
          };
          // console.log(newArt);

          fetch("https://artsell-server-siamcsejnu.vercel.app/allArtWorks", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newArt),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                setLoading(false);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "New ArtWork has been added successfuly",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>ArtSell |Dashboard | Add-Arts</title>
      </Helmet>
      <SectionTitle heading={"Upload Your Artworks !"}></SectionTitle>
      <div className="bg-slate-300 shadow-sm shadow-slate-200 p-5 w-2/3 mx-auto rounded-lg ">
        <form onSubmit={handleSubmit(handleUploadArts)} className="space-y-2">
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
                placeholder="Name your artwork"
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
                {...register("title", { required: "title is required" })}
              />
              {errors?.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1 w-2/5 ">
              <label
                htmlFor="category"
                className="text-lg font-semibold text-slate-800"
              >
                Category
              </label>
              <select
                className="px-3 py-2 w-full border-0 outline-0 rounded-md"
                {...register("category", { required: "category is required" })}
              >
                <option value="paintings">Painting</option>
                <option value="handicrafts">Hndicraft</option>
                <option value="photography">Photography</option>
                <option value="designs">Design</option>
                <option value="drawings">Drawing</option>
                <option value="scultpure">Sculpture</option>
              </select>
              {errors?.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1 w-2/5">
              {" "}
              <label
                htmlFor="artImage"
                className="text-lg font-semibold text-slate-800"
              >
                Upload Artwork Photo
              </label>
              <input
                type="file"
                id="artImage"
                placeholder="Drop your artwork photo"
                className=" file-input "
                {...register("artImage", { required: "ArtImage is required" })}
              />
              {errors?.artImage && (
                <p className="text-red-500 text-sm">
                  {errors.artImage.message}
                </p>
              )}
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
                placeholder="Set base price "
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
                {...register("basePrice", {
                  required: "basePrice is required",
                })}
              />
              {errors?.basePrice && (
                <p className="text-red-500 text-sm">
                  {errors.basePrice.message}
                </p>
              )}
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
                placeholder="Place the name of the owner"
                defaultValue={user?.displayName}
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
                {...register("ownerName", {
                  required: "Owner's name is required",
                })}
              />
              {errors?.ownerName && (
                <p className="text-red-500 text-sm">
                  {errors.ownerName.message}
                </p>
              )}
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
                placeholder="Email of the owner"
                defaultValue={user?.email}
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
                {...register("ownerEmail", {
                  required: "Email is required",
                })}
              />
              {errors?.ownerEmail && (
                <p className="text-red-500 text-sm">
                  {errors.ownerEmail.message}
                </p>
              )}
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
                list="locationSuggestions"
                placeholder="Location of the owner"
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
                {...register("location", {
                  required: "Location is required",
                })}
              />
              <datalist id="locationSuggestions">
                <option value="United Kingdom" />
                <option value="United States" />
                <option value="Bangladesh" />
                <option value="India" />
                <option value="Australia" />
                {/* Add more location suggestions as needed */}
              </datalist>
              {errors?.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
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
                placeholder="Size of the art"
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
                {...register("size")}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="space-y-1 w-2/5">
              <label
                htmlFor="date"
                className="text-lg font-semibold text-slate-800 border-0 outline-0"
              >
                Date
              </label>
              <input
                type="date"
                placeholder="Date of uplodaing"
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
                {...register("date", {
                  required: "date is required",
                })}
              />
              {errors?.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
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
                placeholder="Set days of validity "
                className="w-full px-3 py-2 rounded-md border-0 outline-0"
                {...register("validity", {
                  required: "Validity is required",
                })}
              />
              {errors?.validity && (
                <p className="text-red-500 text-sm">
                  {errors.validity.message}
                </p>
              )}
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
              placeholder="Describe about the artwork "
              className="w-full px-3 py-2 rounded-md border-0 outline-0 "
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors?.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn w-full hover:bg-lime-600 hover:text-slate-800 hover:border-lime-600  text-slate-200 bg-slate-800 border-slate-800"
          >
            {loading ? (
              <ImSpinner4
                className="animate-spin m-auto text-slate-200"
                size={32}
              ></ImSpinner4>
            ) : (
              "Upload ArtWorks"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArts;
