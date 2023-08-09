import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import login from "../../assets/login/login.jpg";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  ImSpinner10,
  ImSpinner2,
  ImSpinner3,
  ImSpinner4,
  ImSpinner5,
} from "react-icons/im";
import SocialLogin from "../../Components/Shared/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        reset();
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <div>
      <Helmet>
        <title>Artsell | Login</title>
      </Helmet>
      <SectionTitle heading="Login Now !" />
      <Container>
        <div
          className="mb-14 pt-20"
          style={{
            backgroundImage: `url(${login})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "800px",
          }}
        >
          {/* <div className="w-1/3 mx-auto border-slate-800 h-1/3 bg-slate-800 bg-opacity-40 "> */}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className=" w-1/3 mx-auto border-slate-800 h-2/3 space-y-4 p-5 bg-slate-800 bg-opacity-40 rounded-md"
          >
            <div className="space-y-2 ">
              <label
                className="text-slate-200 font-semibold text-2xl "
                htmlFor="email"
              >
                Email
              </label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your eamil"
                className="px-3 py-2 w-full border-0 outline-0 rounded-md"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="space-y-2 relative">
              <label
                className="text-slate-200 font-semibold text-2xl"
                htmlFor="passowrd"
              >
                Passowrd
              </label>
              <br />
              <input
                type={showPassword ? "text" : "password"}
                className="px-3 py-2 w-full border-0 outline-0 rounded-md"
                placeholder="********"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                className=" absolute top-11 right-4  "
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
            </div>
            <button
              type="submit"
              className="btn w-full hover:bg-lime-700 hover:border-lime-700 text-slate-200 bg-slate-800 border-slate-800"
            >
              {loading ? (
                <ImSpinner4
                  className="animate-spin m-auto text-slate-200"
                  size={32}
                ></ImSpinner4>
              ) : (
                "Sign In"
              )}
            </button>
            <p className="text-sm text-slate-200">
              Don't Have Account?{" "}
              <Link className="text-lime-500" to="/signup">
                Sign Up
              </Link>{" "}
              here
            </p>
            <SocialLogin> </SocialLogin>
          </form>
          {/* </div> */}
        </div>
      </Container>
    </div>
  );
};

export default Login;
