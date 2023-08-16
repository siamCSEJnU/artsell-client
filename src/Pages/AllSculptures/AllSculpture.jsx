import React from "react";
import Loader from "../../Components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import SculptureItem from "./SculptureItem";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import Container from "../../Components/Container/Container";
import useAllArtWorks from "../../Hooks/useAllArtWorks";

const AllSculpture = () => {
  const [allArtWorks, isLoading] = useAllArtWorks();

  if (isLoading) {
    return <Loader></Loader>;
  }

  const renderedSculpture = allArtWorks?.filter(
    (item) => item.category == "scultpure"
  );
  return (
    <div>
      <Helmet>
        {" "}
        <title>ArtSell | Sculpture</title>{" "}
      </Helmet>
      <SectionTitle heading={"All Sculptures"}></SectionTitle>
      <Container>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10    mb-20  ">
          {renderedSculpture.map((item) => (
            <SculptureItem key={item._id} item={item}></SculptureItem>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllSculpture;
