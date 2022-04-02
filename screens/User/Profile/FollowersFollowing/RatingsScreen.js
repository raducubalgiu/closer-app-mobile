import { StyleSheet, FlatList } from "react-native";
import React from "react";
import CardRatings from "../../../../components/customized/Cards/CardRatings";

const REVIEWS = [
  {
    _id: "1",
    name: "Raducu Balgiu",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    date: "acum 3 sapt",
    rating: 5,
    review: "Serviciu excelent!",
    service: "Tuns scurt",
  },
  {
    _id: "2",
    name: "Petrescu Ionela",
    avatar:
      "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
    date: "acum 4 sapt",
    rating: 4,
    review: "Locatia este centrala. Ma declar foarte multumit, am sa mai merg",
    service: "Tuns lung",
  },
  {
    _id: "3",
    name: "Ionescu Mirela",
    avatar:
      "https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg",
    date: "acum 1 luna",
    rating: 3,
    review: "Nu am fost foarte multumita de serviciul pe care l-am gasit aici",
    service: "Tuns lung",
  },
];

const RatingsScreen = () => {
  return (
    <FlatList
      data={REVIEWS}
      keyExtractor={(item) => item?._id}
      renderItem={({ item }) => (
        <CardRatings
          avatar={item?.avatar}
          name={item?.name}
          date={item?.date}
          rating={item?.rating}
          review={item?.review}
          service={item?.service}
        />
      )}
    />
  );
};

export default RatingsScreen;

const styles = StyleSheet.create({});
