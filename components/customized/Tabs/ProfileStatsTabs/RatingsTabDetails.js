import { StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CardRatings from "../../Cards/CardRatings";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../../../context/auth";
import { Spinner } from "../../../core";

const RatingsTabDetails = (props) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${props.userId}/reviews`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setReviews(res.data.reviews);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [props.userId, user?.token]);

  return (
    <>
      {!loading && (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <CardRatings
              avatar={item?.reviewer?.avatar?.url}
              name={item?.reviewer?.name}
              date={moment(item?.createdAt).format("LL")}
              rating={item?.rating}
              review={item?.review}
              service={"Tuns"}
            />
          )}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};

export default RatingsTabDetails;

const styles = StyleSheet.create({});
