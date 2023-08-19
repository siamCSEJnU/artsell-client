import close from "../../assets/icons/delete1.png";
const FollowersModal = ({ handleOnClose, followers, visible }) => {
  if (!visible) return null;
  return (
    <div className="absolute bg-slate-950 bg-opacity-95 text-slate-100 py-3 px-5 rounded-md top-68 right-80 pb-8  mr-16  ">
      <div>
        <div className="text-center">
          <button onClick={handleOnClose}>
            <img src={close} className="h-10" alt="" />
          </button>
        </div>
        {followers && followers?.length > 0 ? (
          followers?.map((item) => (
            <div key={item?._id}>
              <div className="flex gap-16 pt-4 items-center">
                <div className="">
                  <img
                    src={item?.photoURL}
                    className="h-14 rounded-lg"
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-lg">
                    {item?.userName || item?.name || item?.displayName}
                  </h2>
                  <p className="text-sm">
                    {item?.location ? item?.location : "Dhaka, Bangladesh"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg">No followers yet!!</div>
        )}
      </div>
    </div>
  );
};

export default FollowersModal;
