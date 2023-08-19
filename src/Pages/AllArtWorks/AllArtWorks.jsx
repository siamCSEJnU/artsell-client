import { Helmet } from "react-helmet-async";
import Loader from "../../Components/Loader/Loader";
import useAllArtWorks from "../../Hooks/useAllArtWorks";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import Container from "../../Components/Container/Container";
import ArtItem from "./ArtItem";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useState } from "react";

const AllArtWorks = () => {
  const [allArtWorks, isLoading] = useAllArtWorks();
  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };
  const validArtWorks = allArtWorks.filter((item) => item.status == "accepted");
  const renderedArtWorks = showAll ? validArtWorks : validArtWorks.slice(0, 12);

  return (
    <div>
      <Helmet>
        <title>ArtSell | allArtworks</title>
      </Helmet>
      <SectionTitle heading={"All Artworks"}></SectionTitle>
      <Container>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 pt-4 ">
          {renderedArtWorks.map((item) => (
            <ArtItem key={item._id} item={item}></ArtItem>
          ))}
        </div>
        <div className="flex justify-center py-10">
          {" "}
          <button
            className="btn bg-orange-400 w-44 hover:bg-slate-800 text-white"
            onClick={handleToggleShowAll}
          >
            {showAll ? "Show Less" : "Show All "}
            {showAll ? (
              <AiOutlineArrowUp size={25} />
            ) : (
              <AiOutlineArrowDown size={25} />
            )}
          </button>
        </div>
      </Container>
    </div>
  );
};

export default AllArtWorks;
