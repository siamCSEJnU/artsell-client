import React from "react";
import useAllArtWorks from "../../Hooks/useAllArtWorks";
import Loader from "../../Components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import Container from "../../Components/Container/Container";
import HandiCraftItem from "./HandiCraftItem";

const AllHandiCrafts = () => {
  const [allArtWorks, isLoading] = useAllArtWorks();

  if (isLoading) {
    return <Loader></Loader>;
  }

  const renderedHandiCrafts = allArtWorks?.filter(
    (item) => item.category == "handicrafts"
  );
  return (
    <div>
      <Helmet>
        {" "}
        <title>ArtSell | Handicrafts</title>{" "}
      </Helmet>
      <SectionTitle heading={"All HandiCrafts"}></SectionTitle>
      <Container>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10    mb-20  ">
          {renderedHandiCrafts.map((item) => (
            <HandiCraftItem key={item._id} item={item}></HandiCraftItem>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllHandiCrafts;
