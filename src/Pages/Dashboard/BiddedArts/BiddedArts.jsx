import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import useAllArtWorks from "../../../Hooks/useAllArtWorks";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import useAllUsers from "../../../Hooks/useAllUsers";

const BiddedArts = () => {
  const [allArtWorks, isLoading, refetch] = useAllArtWorks();
  const [allUsers, isLoadingUsers] = useAllUsers();

  const { user } = useAuth();
  if (!user) return <Loader></Loader>;
  const myBiddedArts = allArtWorks?.filter((art) =>
    art?.bidding_info?.some((bidder) => bidder.bidder_email === user?.email)
  );
  console.log(allUsers);
  console.log(myBiddedArts);
  return (
    <div>
      <Helmet>ArtSell | Dashboard | BiddedArts</Helmet>
      <SectionTitle
        heading={`Total Bidded ${myBiddedArts.length}`}
      ></SectionTitle>
      <div className="overflow-x-auto mr-5 mb-16">
        <table className="table">
          <thead className="bg-slate-200 text-slate-900 ">
            <tr className="text-center text-lg">
              <th>#</th>
              <th>Arts</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Validity</th>
              <th>Your Bid</th>
              <th>Current Highest Bid</th>
              <th>Bidding Status</th>
            </tr>
          </thead>
          <tbody className="text-center bg-slate-900 text-lg text-slate-200">
            {myBiddedArts?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td
                  className="flex items-center justify-center tooltip tooltip-top "
                  data-tip="view details"
                >
                  <Link to={`/allArtWorks/${item._id}`}>
                    {" "}
                    <img
                      src={item?.art_img_url}
                      className="h-16 w-16 object-cover rounded-lg"
                      alt=""
                    />
                  </Link>
                </td>
                <td className="font-semibold ">{item.category}</td>
                <td
                  className="flex items-center justify-center tooltip tooltip-top"
                  data-tip="view details"
                >
                  {" "}
                  <Link
                    to={`/allArtists/${
                      allUsers.find((user) => user.email == item.owner_email)
                        ._id
                    }`}
                  >
                    {" "}
                    <img
                      src={
                        allUsers.find((user) => user.email == item.owner_email)
                          .photoURL
                      }
                      className="h-16 w-16 object-cover rounded-full"
                      alt=""
                    />
                  </Link>
                </td>
                <td className="font-semibold">{item.validity}</td>
                <td className="font-semibold">
                  $
                  {parseFloat(
                    item?.bidding_info?.find(
                      (p) => p.bidder_email == user?.email
                    )?.bidding_amount
                  ).toFixed(2)}
                </td>
                <td className="font-semibold">
                  $
                  {item &&
                    item.bidding_info &&
                    item.bidding_info.length > 0 &&
                    Math.max(
                      ...item.bidding_info.map((i) =>
                        parseFloat(i.bidding_amount)
                      )
                    ).toFixed(2)}
                </td>
                <td
                  className={`font-semibold ${
                    item?.bidding_status == "on"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item?.bidding_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BiddedArts;
