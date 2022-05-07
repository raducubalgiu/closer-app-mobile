import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../context/auth";

const FollowButton = (props) => {
  const [follow, setFollow] = useState(true);
  const { user, setUser } = useAuth();
  const FOLLOW_ENDPOINT = `${process.env.BASE_ENDPOINT}/users/${user?._id}/follower/${props.followeeId}/followee/follows`;

  useEffect(() => {
    axios
      .get(FOLLOW_ENDPOINT, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setFollow(res.data.status);
      })
      .catch((error) => {
        console.log(error);
        setFollow(false);
      });
  }, [user, props.followeeId]);

  const followHandler = () => {
    if (!follow) {
      axios
        .post(FOLLOW_ENDPOINT, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then(() => {
          setFollow(true);
          props.fetchUser ? props.fetchUser() : null;
          props.fetchSuggested ? props.fetchSuggested() : null;
          setUser({
            ...user,
            counter: {
              followersCount: user.counter.followersCount,
              ratingsAverage: user.counter.ratingsAverage,
              ratingsQuantity: user.counter.ratingsQuantity,
              followingCount: user.counter.followingCount + 1,
            },
          });
        })
        .catch((error) => {
          console.log(error);
          setFollow(false);
        });
    }
    if (follow) {
      axios
        .delete(FOLLOW_ENDPOINT, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then(() => {
          setFollow(false);
          props.fetchUser ? props.fetchUser() : null;
          setUser({
            ...user,
            counter: {
              followersCount: user.counter.followersCount,
              ratingsAverage: user.counter.ratingsAverage,
              ratingsQuantity: user.counter.ratingsQuantity,
              followingCount: user.counter.followingCount - 1,
            },
          });
        })
        .catch((error) => console.log(error));
    }
  };

  const styles = StyleSheet.create({
    btn: {
      borderWidth: 1,
      borderColor: follow ? "#ddd" : theme.lightColors.primary,
      paddingVertical: props.size === "lg" ? 10 : 4.5,
      paddingHorizontal: props.size === "lg" ? 20 : 15,
      borderRadius: 2.5,
      backgroundColor: follow ? "white" : theme.lightColors.primary,
    },
    btnText: {
      fontFamily: "Exo-SemiBold",
      color: follow ? theme.lightColors.black : "white",
      fontSize: 13,
    },
  });

  return (
    <TouchableOpacity
      style={{ ...styles.btn, ...props.sxBtn }}
      onPress={followHandler}
    >
      <Text style={{ ...styles.btnText, ...props.sxBtnText }}>
        {follow ? "Urmaresti" : "Urmareste"}
      </Text>
    </TouchableOpacity>
  );
};

export default FollowButton;
