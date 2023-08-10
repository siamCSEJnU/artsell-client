import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import anim1 from "../assets/dashboard/anim1.json";
import anim2 from "../assets/dashboard/anim2.json";
import Lottie from "lottie-react";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setContentLoaded(false);
    } else {
      setContentLoaded(true);
    }
  }, [location]);

  return (
    <div>
      <div className="flex h-screen gap-5">
        <div className="w-1/5  p-5  text-slate-200 text-lg font-semibold  bg-slate-800">
          <Link className="text-5xl font-bold flex mb-5 justify-center" to="/">
            Art<span className="text-lime-600">Sell</span>
          </Link>
          <img
            style={{ width: "200px", height: "200px" }}
            className="rounded-full mx-auto"
            src={user?.photoURL}
            alt=""
          />
          <div>
            <NavLink>
              {" "}
              <h3 className="flex justify-center pt-5">My Arts</h3>
            </NavLink>
            <NavLink to="/dashboard/addArts">
              {" "}
              <h3 className="flex justify-center py-5">Add Arts</h3>
            </NavLink>
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
        <div className="w-4/5">
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
