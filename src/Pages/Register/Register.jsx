import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import Container from "../../Components/Container/Container";
import registerimage from "../../assets/register/register.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner3, ImSpinner4, ImSpinner5 } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const { loading, setLoading, createUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSignUp = (data) => {
    console.log(data);
    console.log(data);
    if (data.password !== data.confirm) {
      return;
    }

    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(data.name, data.photoUrl)
          .then(() => {
            const saveUser = {
              userName: data.firstName + " " + data.lastName,
              email: data.email,
              photoURL: data.photoUrl,
              role: data.role,
            };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User has been created successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  reset();
                  //navigate
                  navigate(from, { replace: true });
                }
              });
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message, { autoClose: 1000 });
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message, { autoClose: 1000 });
      });
  };
  return (
    <div>
      <Helmet>
        <title>Artsell | SignUp</title>
      </Helmet>
      <SectionTitle heading={"SignUp Here!"}></SectionTitle>
      <div>
        <Container>
          <div className="flex justify-center  gap-16 mb-14 ">
            <img src={registerimage} className="w-1/3" alt="" />
            <div className="w-1/3">
              <form
                onSubmit={handleSubmit(handleSignUp)}
                className="bg-slate-800 p-5 bg-opacity-80 rounded-md space-y-2"
              >
                <div className="flex gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="firstName"
                      className="text-slate-200 font-semibold text-xl "
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your First Name"
                      className="px-3 py-1 w-full border-0 outline-0 rounded-md"
                      {...register("firstName", { required: true })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="lastName"
                      className="text-slate-200 font-semibold text-xl "
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Last Name"
                      className="px-3 py-1 w-full border-0 outline-0 rounded-md"
                      {...register("lastName", { required: true })}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="photoUrl"
                    className="text-slate-200 font-semibold text-xl "
                  >
                    Photo URL
                  </label>
                  <input
                    type="text"
                    placeholder="Profile Photo Url"
                    className="px-3 py-1 w-full border-0 outline-0 rounded-md"
                    {...register("photoUrl")}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="role"
                    className="text-slate-200 font-semibold text-xl "
                  >
                    User's Role
                  </label>
                  <br />
                  <select
                    className="px-3 py-1 w-full border-0 outline-0 rounded-md"
                    {...register("role")}
                  >
                    <option value="client">Client</option>
                    <option value="artist">Artist</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="text-slate-200 font-semibold text-xl "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email "
                    className="px-3 py-1 w-full border-0 outline-0 rounded-md"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="space-y-1 relative">
                  <label
                    htmlFor="password"
                    className="text-slate-200 font-semibold text-xl "
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="px-3 py-1 w-full border-0 outline-0 rounded-md"
                    placeholder="******* "
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long.",
                      },
                      pattern: {
                        value: /(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{6,}/,
                        message:
                          "Password must contain at least one uppercase letter and one special character.",
                      },
                    })}
                  />

                  {errors.password?.type === "required" && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}

                  <button
                    type="button"
                    className=" absolute top-9 right-4  "
                    onClick={() => handleTogglePassword("password")}
                  >
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </button>
                </div>
                <div className="space-y-1 relative">
                  <label
                    htmlFor="confirm"
                    className="text-slate-200 font-semibold text-xl "
                  >
                    Retype Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="px-3 py-1 w-full border-0 outline-0 rounded-md"
                    placeholder="******* "
                    {...register("confirm", {
                      required: true,
                      validate: {
                        matchesPassword: (value) =>
                          value === watch("password") || "Password mismatched",
                      },
                    })}
                  />
                  {errors.confirm && (
                    <span className="text-red-500 text-sm">
                      {errors.confirm.message}
                    </span>
                  )}
                  <button
                    type="button"
                    className=" absolute top-9 right-4  "
                    onClick={() => handleTogglePassword("confirm")}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="py-1">
                  <button
                    type="submit"
                    className="btn w-full  hover:bg-slate-800 hover:border-slate-800  text-slate-200 bg-lime-600 border-lime-600"
                  >
                    {loading ? (
                      <ImSpinner4
                        className="animate-spin m-0 text-slate-200"
                        size={32}
                      ></ImSpinner4>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
                <p className="text-sm text-slate-200">
                  Already Have an Account?{" "}
                  <Link className="text-lime-600" to="/login">
                    Sign In
                  </Link>{" "}
                  here
                </p>
                {/* <SocialLogin></SocialLogin> */}
              </form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Register;
