import { StyleSheet, FlatList } from "react-native";
import React from "react";
import CardRatings from "../../../../components/customized/Cards/CardRatings";

const RatingsTabDetails = (props) => {
  return (
    <FlatList
      data={props.reviews}
      keyExtractor={(item) => item?._id}
      renderItem={({ item }) => (
        <CardRatings
          avatar={item?.reviewer?.avatar}
          name={item?.reviewer?.name}
          date={item?.createdDate}
          rating={item?.rating}
          review={item?.review}
          service={"Tuns"}
        />
      )}
    />
  );
};

export default RatingsTabDetails;

const styles = StyleSheet.create({});
