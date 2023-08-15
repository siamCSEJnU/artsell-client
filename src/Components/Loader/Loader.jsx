import { BounceLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <BounceLoader
        // height={130}
        // width={50}
        size={150}
        // color="#65a30d"
        color="#1e293b"
        margin={8}
      ></BounceLoader>
    </div>
  );
};

export default Loader;
