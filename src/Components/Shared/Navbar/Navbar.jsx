import { Link, NavLink } from "react-router-dom";
import Container from "../../Container/Container";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navOptions = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-lime-500" : "")}
      >
        <li>Home</li>
      </NavLink>
      <li>Collection</li>
      <li>Contact</li>
      <li>About</li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User has been signed out successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="text-slate-200 bg-slate-800">
      <Container>
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navOptions}
              </ul>
            </div>
            <Link className="text-4xl font-bold" to="/">
              Art<span className="text-lime-600">Sell</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-5 font-semibold text-lg">
              {navOptions}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="flex items-center gap-2">
                <div
                  className="lg:tooltip tooltip-top"
                  data-tip={user.displayName}
                >
                  <img
                    src={user.photoURL}
                    className="rounded-full h-11 w-11"
                    alt="userphoto"
                  />
                </div>

                <button
                  onClick={handleLogOut}
                  className=" px-2 py-2 rounded-lg  bg-lime-600 border-emerald-600 text-base font-bold text-slate-800"
                >
                  LogOut
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className=" px-2 py-2 rounded-lg  bg-lime-600 border-emerald-600 text-base font-bold text-slate-800">
                  Login/Register
                </button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
