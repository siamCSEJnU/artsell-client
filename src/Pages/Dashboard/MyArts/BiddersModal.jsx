import close from "../../../assets/icons/delete1.png";

const BiddersModal = ({ visible, handleOnClose, bidders }) => {
  if (!visible) return null;

  return (
    <div className="fixed bg-slate-950 bg-opacity-95 text-slate-200 py-3 px-5 rounded-md top-24 right-16 pb-8  mr-16  ">
      <div>
        <div className="text-center">
          <button onClick={handleOnClose}>
            <img src={close} className="h-10" alt="" />
          </button>
        </div>
        {bidders && bidders.length > 0 ? (
          bidders.map((item) => (
            <div key={item.bidder_email}>
              <div className="flex items-center space-y-5  gap-10">
                <h4 className="pt-3">${item.bidding_amount}</h4>
                <div className="flex items-center gap-2">
                  <img
                    src={item.bidder_img}
                    className="h-12 w-12 rounded-lg object-cover"
                    alt=""
                  />
                  <div>
                    <h2>{item?.bidder_name}</h2>
                    <p className="text-sm ">{item.bidder_location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg">No Bidders yet!!</div>
        )}
      </div>
    </div>
  );
};

export default BiddersModal;
