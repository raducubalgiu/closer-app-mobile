import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";

const LikeIButton = (props) => {
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${props.postId}/post/${user?._id}/user/check-like`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then((res) => {
        console.log(res.data.status);
        setLiked(res.data.status);
      })
      .catch((err) => console.log(err));
  }, [props.postId]);

  const likeHandler = () => {
    if (!liked) {
      axios
        .post(
          `${process.env.BASE_ENDPOINT}/users/like`,
          {
            postId: props.postId,
            userId: user?._id,
          },
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((res) => {
          setLiked(res.data.status);
          props.onAddLike();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .delete(
          `${process.env.BASE_ENDPOINT}/users/${props.postId}/post/${user?._id}/user/unlike`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((res) => {
          setLiked(res.data.status);
          props.onRemoveLike();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={likeHandler}
      style={{ ...styles.default, ...props.sx }}
    >
      <Icon
        type="antdesign"
        name={liked ? "heart" : "hearto"}
        size={props.size ? props.size : 24}
        color={liked ? "#F72A50" : ""}
      />
    </TouchableOpacity>
  );
};

export default LikeIButton;

const styles = StyleSheet.create({
  default: {
    marginLeft: 22.5,
  },
});
