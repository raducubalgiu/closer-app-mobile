import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { CardRatings } from "../../../customized";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../../../hooks";
import { Spinner } from "../../../core";

export const RatingsTab = ({ userId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (loading) return;
      setLoading(true);
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${userId}/reviews`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          setReviews(res.data.reviews);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [userId, user?.token])
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
          showsVerticalScrollIndicator={false}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
