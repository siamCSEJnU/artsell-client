import React from "react";
import Loader from "../../Components/Loader/Loader";
import useAllArtWorks from "../../Hooks/useAllArtWorks";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";

import PhotographyItem from "./PhotographyItem";
import Container from "../../Components/Container/Container";

const AllPhotography = () => {
  const [allArtWorks, isLoading] = useAllArtWorks();

  if (isLoading) {
    return <Loader></Loader>;
  }

  const renderedPhotography = allArtWorks
    ?.filter((art) => art.status == "accepted")
    ?.filter((item) => item.category == "photography");
  return (
    <div>
      <Helmet>
        {" "}
        <title>ArtSell | Photography</title>{" "}
      </Helmet>
      <SectionTitle heading={"All Photography"}></SectionTitle>
      <Container>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10    mb-20  ">
          {renderedPhotography.map((item) => (
            <PhotographyItem key={item._id} item={item}></PhotographyItem>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPhotography;
