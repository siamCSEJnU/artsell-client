import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import anim1 from "../assets/dashboard/anim1.json";
import anim2 from "../assets/dashboard/anim2.json";
import Lottie from "lottie-react";
import useAdmin from "../Hooks/useAdmin";
import useArtist from "../Hooks/useArtist";
import Loader from "../Components/Loader/Loader";
import useClient from "../Hooks/useClient";
import useAllUsers from "../Hooks/useAllUsers";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [allUsers, ,] = useAllUsers();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isArtist, isArtistLoading] = useArtist();
  const [isClient, isClientLoading] = useClient();
  const currentUser = allUsers?.find((current) => current.email == user.email);
  // console.log(currentUser);
  useEffect(() => {
    if (location?.pathname === "/dashboard") {
      setContentLoaded(false);
    } else {
      setContentLoaded(true);
    }
  }, [location]);

  if (!user || isAdminLoading || isArtistLoading || isClientLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="flex   gap-5">
        <div className="w-1/5 p-5 text-slate-200 text-lg font-semibold bg-slate-800 ">
          <div className="h-screen overflow-y-auto sticky top-0">
            <Link
              className="text-5xl font-bold flex mb-5 justify-center"
              to="/"
            >
              Art<span className="text-lime-600">Sell</span>
            </Link>
            <img
              style={{ width: "200px", height: "200px" }}
              className="rounded-full mx-auto object-cover"
              src={user?.photoURL}
              alt=""
            />
            <h2 className="text-center text-2xl text-slate-100 py-2">
              {(user && currentUser && currentUser?.userName) ||
                currentUser?.displayName ||
                currentUser?.name}
            </h2>
            {/* <hr /> */}
            <div>
              {isArtist && (
                <>
                  {" "}
                  <NavLink
                    to="/dashboard/myArts"
                    className={({ isActive }) =>
                      isActive ? "text-lime-500" : ""
                    }
                  >
                    {" "}
                    <h3 className="flex justify-center pt-5">My Arts</h3>
                  </NavLink>
                  <NavLink
                    to="/dashboard/addArts"
                    className={({ isActive }) =>
                      isActive ? "text-lime-500" : ""
                    }
                  >
                    {" "}
                    <h3 className="flex justify-center py-5">Add Arts</h3>
                  </NavLink>
                </>
              )}
              {isAdmin && (
                <>
                  {" "}
                  <NavLink
                    to="/dashboard/manageArts"
                    className={({ isActive }) =>
                      isActive ? "text-lime-500" : ""
                    }
                  >
                    {" "}
                    <h3 className="flex justify-center pt-5">Manage Arts</h3>
                  </NavLink>
                  <NavLink
                    to="/dashboard/manageUsers"
                    className={({ isActive }) =>
                      isActive ? "text-lime-500" : ""
                    }
                  >
                    {" "}
                    <h3 className="flex justify-center py-5">Manage Users</h3>
                  </NavLink>
                </>
              )}
              {isClient && (
                <>
                  {" "}
                  <NavLink
                    to="/dashboard/biddedArts"
                    className={({ isActive }) =>
                      isActive ? "text-lime-500" : ""
                    }
                  >
                    {" "}
                    <h3 className="flex justify-center py-5">Bidded Arts</h3>
                  </NavLink>
                  {/* <NavLink
                    to="/dashboard/manageUsers"
                    className={({ isActive }) =>
                      isActive ? "text-lime-500" : ""
                    }
                  >
                    {" "}
                    <h3 className="flex justify-center py-5">Manage Users</h3>
                  </NavLink> */}
                </>
              )}
            </div>
            <hr />
            <NavLink to="/">
              {" "}
              <h3 className="flex justify-center py-3">Home</h3>
            </NavLink>
            <NavLink>
              {" "}
              <h3 className="flex justify-center pb-3">Designs</h3>
            </NavLink>
            <NavLink>
              {" "}
              <h3 className="flex justify-center pb-3">Paintings</h3>
            </NavLink>
            <NavLink>
              {" "}
              <h3 className="flex justify-center pb-3">Handicrafts</h3>
            </NavLink>
            <NavLink>
              {" "}
              <h3 className="flex justify-center pb-3">Artists</h3>
            </NavLink>
          </div>
        </div>
        <div className="w-4/5 overflow-y-auto">
          {contentLoaded ? (
            <Outlet />
          ) : (
            <div>
              <Lottie
                className="w-3/5 mx-auto mt-16 "
                animationData={anim1}
                loop={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
