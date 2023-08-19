import { useEffect, useState } from "react";
import useAllArtWorks from "../../Hooks/useAllArtWorks";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ArtistItem = ({ item }) => {
  const [allArtWorks, isLoading] = useAllArtWorks();
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    if (item?.followers) {
      setIsFollowing(item?.followers?.includes(user?.email));
    }
  }, [item?.followers, user?.email]);

  const handleFollowUnfollow = (action, artistId) => {
    fetch(
      `http://localhost:5000/followers/${action}/${artistId}/${user?.email}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${action}ed successfully`, {
            autoClose: 1000,
            position: "top-center",
            theme: "dark",
          });
          // Update isFollowing state
          setIsFollowing(!isFollowing);
        }
      });
  };

  // console.log(item);
  //   console.log(allArtWorks);
  const artWorks = allArtWorks.filter((art) => art.owner_email == item.email);
  //   console.log(artWork);
  return (
    <div className="bg-slate-800 p-1 group rounded-lg ">
      <div>
        <img
          src={artWorks[0]?.art_img_url}
          className="h-44 w-full object-cover rounded-md group-hover:brightness-110 "
          alt=""
        />
      </div>
      <div className="-mt-20 flex justify-center ">
        <img
          src={item?.photoURL}
          className="rounded-full h-32 w-32  object-cover group-hover:scale-125"
          alt=""
        />
      </div>
      <div className="text-slate-200 my-2 p-2">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl">{item.userName}</h2>

          <h3>{item?.role}</h3>
          <h3>{item?.location}</h3>
          <h3 className="text-lg">Total Artworks : {artWorks?.length}</h3>
        </div>
      </div>

      <div className="flex justify-between p-2">
        <button
          onClick={() =>
            handleFollowUnfollow(isFollowing ? "unfollow" : "follow", item._id)
          }
          className={`tooltip tooltip-top rounded-lg ${
            isFollowing ? "bg-slate-300" : "bg-lime-600"
          } border-emerald-600 font-semibold text-slate-800 px-2 py-1`}
          data-tip={isFollowing ? "Unfollow" : "Follow"}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
        <Link to={`/allArtists/${item._id}`}>
          {" "}
          <button className="rounded-lg  bg-lime-600 border-emerald-600  font-semibold text-slate-800 px-2 py-1">
            {" "}
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArtistItem;
