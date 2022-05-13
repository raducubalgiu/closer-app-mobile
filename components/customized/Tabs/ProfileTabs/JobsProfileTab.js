import { StyleSheet, FlatList } from "react-native";
import React from "react";
import NotFoundContent from "../../NotFoundContent/NotFoundContent";
import CardJob from "../../Cards/CardJob";
import { useAuth } from "../../../../hooks/auth";

const jobs = [
  // {
  //   _id: "1",
  //   name: "Stylist",
  //   description: "Cautam frizer pentru locatia noastra din Aleea Alexandru...",
  //   priority: "Ridicata",
  // },
  // {
  //   _id: "2",
  //   name: "Maseur",
  //   description: "Cautam maseur pentru locatia noastra din Aleea Alexandru...",
  //   priority: "Redusa",
  // },
  // {
  //   _id: "3",
  //   name: "Stylist",
  //   description: "Cautam stylist pentru locatia noastra din Aleea Alexandru...",
  //   priority: "Redusa",
  // },
];

export const JobsProfileTab = () => {
  // const { user } = useAuth();

  // let noFoundContent;
  // if (jobs.length === 0 && user?._id === userId) {
  //   noFoundContent = (
  //     <NotFoundContent
  //       iconName="award"
  //       iconType="feather"
  //       title="Job-urile tale"
  //       description="In aceasta sectiune vei putea lista joburi pentru business-ul tau"
  //     />
  //   );
  // }

  return (
    <></>
    // <FlatList
    //   data={jobs}
    //   keyExtractor={(item) => item?._id}
    //   renderItem={({ item }) => (
    //     <CardJob
    //       name={item?.name}
    //       description={item?.description}
    //       priority={item?.priority}
    //     />
    //   )}
    //   ListHeaderComponent={noFoundContent}
    // />
  );
};

const styles = StyleSheet.create({});
