import { StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import CardRatings from "../../Cards/CardRatings";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../../../context/auth";
import { Spinner } from "../../../core";

export const RatingsTab = (props) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${props.userId}/reviews`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          console.log("Fetch Ratings");
          setReviews(res.data.reviews);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, [props.userId, user?.token])
  );

  const renderRatings = ({ item }) => {
    const { reviewer, rating, review, createdAt } = item;

    return (
      <CardRatings
        avatar={reviewer?.avatar}
        name={reviewer?.name}
        date={moment(createdAt).format("LL")}
        rating={rating}
        review={review}
        service={"Tuns"}
      />
    );
  };

  return (
    <>
      {!loading && (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item?._id}
          renderItem={renderRatings}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};

const styles = StyleSheet.create({});
