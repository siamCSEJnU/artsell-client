import { FcGoogle } from "react-icons/fc";
const SocialLogin = () => {
  return (
    <div>
      <div className="divider py-5 text-slate-200 ">OR</div>
      <div className="flex justify-center items-center  border-slate-400 m-3 p-2 rounded-md space-x-2 cursor-pointer bg-slate-200 hover:bg-slate-400  outline-0">
        <FcGoogle size={32}></FcGoogle>
        <p className="font-semibold text-lg">Continue With Google</p>
      </div>
    </div>
  );
};

export default SocialLogin;