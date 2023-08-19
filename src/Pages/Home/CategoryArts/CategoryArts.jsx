import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAllArtWorks from "../../../Hooks/useAllArtWorks";
import { useState } from "react";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import CategoryArtCard from "./CategoryArtCard";
import Container from "../../../Components/Container/Container";

const CategoryArts = () => {
  const [allArtWorks, isLoading, refetch] = useAllArtWorks();
  const categories = [...new Set(allArtWorks.map((item) => item.category))];
  console.log(categories);
  return (
    <div className="my-20">
      <Container>
        <SectionTitle heading={"Artwork Categories"}></SectionTitle>
        <Tabs className="text-center">
          <TabList className="bg-slate-200 text-slate-900 text-lg font-semibold ">
            {categories?.map((category) => (
              <Tab key={category}>{category}</Tab>
            ))}
          </TabList>
          {categories?.map((category) => (
            <TabPanel key={category}>
              <div className="flex flex-wrap gap-36 p-3 justify-center bg-slate-950 bg-opacity-90 ">
                {allArtWorks
                  ?.filter(
                    (art) =>
                      art?.category?.toLowerCase() === category?.toLowerCase()
                  )
                  .slice(1, 3)
                  .map((item) => (
                    <CategoryArtCard
                      key={item?._id}
                      item={item}
                    ></CategoryArtCard>
                  ))}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default CategoryArts;
