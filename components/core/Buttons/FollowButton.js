import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Colors } from "../../../assets/styles/Colors";
import { useAuth } from "../../../context/auth";

const FollowButton = (props) => {
  const [follow, setFollow] = useState(true);
  const { user, setUser } = useAuth();

  useEffect(() => {
    axios
      .get(
        `http://192.168.100.2:8000/api/v1/users/${user?._id}/follower/${props.followingId}/followee/check-follow`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setFollow(res.data.status);
      })
      .catch((error) => {
        console.log(error);
        setFollow(false);
      });
  }, [props.followingId]);

  const followHandler = () => {
    if (!follow) {
      axios
        .post(
          `http://192.168.100.2:8000/api/v1/users/follow`,
          {
            userId: user?._id,
            followingId: props.followingId,
          },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then(() => {
          setFollow(true);
          props.fetchUser ? props.fetchUser() : null;
          props.fetchSuggested ? props.fetchSuggested() : null;
          setUser({ ...user, followingCount: user?.followingCount + 1 });
        })
        .catch((error) => {
          console.log(error);
          setFollow(false);
        });
    }
    if (follow) {
      axios
        .delete(
          `http://192.168.100.2:8000/api/v1/users/${user?._id}/followee/${props.followingId}/follower/unfollow`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then(() => {
          setFollow(false);
          props.fetchUser ? props.fetchUser() : null;
          setUser({ ...user, followingCount: user?.followingCount - 1 });
        })
        .catch((error) => console.log(error));
    }
  };

  const styles = StyleSheet.create({
    btn: {
      borderWidth: 1,
      borderColor: follow ? "#ddd" : Colors.primary,
      paddingVertical: props.size === "lg" ? 10 : 4.5,
      paddingHorizontal: props.size === "lg" ? 20 : 15,
      borderRadius: 2.5,
      backgroundColor: follow ? "white" : Colors.primary,
    },
    btnText: {
      fontFamily: "Exo-SemiBold",
      color: follow ? Colors.textDark : "white",
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
