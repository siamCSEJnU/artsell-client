import { useParams } from "react-router-dom";
import useAllUsers from "../../Hooks/useAllUsers";
import Loader from "../../Components/Loader/Loader";
import Container from "../../Components/Container/Container";
import location from "../../assets/icons/loaction1.png";
import email from "../../assets/icons/email1.png";
import followerIcon from "../../assets/icons/followers1.png";
import { useState } from "react";
import FollowersModal from "./FollowersModal";
import SingleArtSlider from "../SingleArtWork/SingleArtSlider";
import useAllArtWorks from "../../Hooks/useAllArtWorks";

const SingleArtist = () => {
  const { id } = useParams();
  const [allUsers, isLoadingUsers, refetch] = useAllUsers();
  const [allArtWorks, ,] = useAllArtWorks();
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [followers, setFollowers] = useState([]);
  if (isLoadingUsers) return <Loader></Loader>;
  const artist = allUsers?.find((user) => user._id == id);

  const handleOnClose = () => {
    setShowFollowersModal(false);
    setFollowers([]);
  };

  const openFollowersModal = (followersWithEmail) => {
    const followers = followersWithEmail?.map((email) =>
      allUsers?.find((user) => user.email == email)
    );

    setFollowers(followers);
    setShowFollowersModal(true);
  };
  return (
    <div className="my-16">
      <Container>
        {" "}
        <div className="flex  gap-10 bg-slate-900 text-slate-100 p-8">
          <div className="w-1/2">
            <img src={artist?.photoURL} className="object-cover" alt="" />
          </div>
          <div className="space-y-4 w-1/2">
            <div className="space-y-1">
              {" "}
              <h2 className="text-3xl">{artist?.userName}</h2>
              <p className="text-lg italic tracking-wider">{artist?.role}</p>
            </div>
            <div
              className="flex items-center tooltip tooltip-top text-lg gap-3"
              data-tip="location"
            >
              <img src={location} className="h-7" alt="" />
              <p>
                {artist && artist.location
                  ? artist?.location
                  : "Dhaka, Bangladesh"}
              </p>
            </div>
            <div
              className="flex text-lg tooltip tooltip-right items-center gap-3"
              data-tip="email"
            >
              <img src={email} className="h-7" alt="" />
              <p>{artist?.email}</p>
            </div>
            <div
              onClick={() => openFollowersModal(artist.followers || [])}
              className="flex tooltip tooltip-bottom  text-lime-500 text-lg items-center gap-3 relative cursor-pointer "
              data-tip="View Followers"
            >
              <img src={followerIcon} className="h-7" alt="" />
              <p className="bg-slate-100 text-lime-800 px-2 rounded-xl font-semibold">
                Followers
              </p>
              <div
                className="bg-lime-500 text-slate-950 rounded-full w-6 h-6 flex justify-center items-center absolute  bottom-4"
                style={{ right: "480px" }}
              >
                <p>
                  {artist && artist.followers ? artist?.followers.length : "0"}
                </p>
              </div>
            </div>
            <FollowersModal
              handleOnClose={handleOnClose}
              followers={followers}
              visible={showFollowersModal}
            ></FollowersModal>
          </div>
        </div>
        <div className="mt-12 ">
          <div className="flex items-center justify-center gap-3    ">
            <img
              src={artist?.photoURL}
              className="h-16 w-16 rounded-full   object-cover"
              alt=""
            />
            <h2 className="text-2xl text-slate-800 font-semibold  ">
              More From{" "}
              {artist?.userName || artist?.name || artist?.displayName}{" "}
            </h2>
          </div>
          <div>
            <SingleArtSlider
              ownerArts={allArtWorks?.filter(
                (item) => item?.owner_email == artist?.email
              )}
            ></SingleArtSlider>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleArtist;
