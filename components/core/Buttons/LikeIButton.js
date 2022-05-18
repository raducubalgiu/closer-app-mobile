import { Animated, StyleSheet, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/auth";

const LikeIButton = ({ postId, onAddLike, onRemoveLike, ...props }) => {
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();
  const animatedScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/posts/${postId}/likes`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then((res) => {
        setLiked(res.data.status);
      })
      .catch((err) => console.log(err));
  }, [postId]);

  const likeHandler = () => {
    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 15,
      speed: 20,
      useNativeDriver: true,
    }).start();

    if (!liked) {
      setLiked(true);
      axios
        .post(
          `${process.env.BASE_ENDPOINT}/users/${user?._id}/posts/${postId}/likes`,
          {
            postId: postId,
          },
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then(() => {
          onAddLike();
        })
        .catch(() => setLiked(false));
    } else {
      axios
        .delete(
          `${process.env.BASE_ENDPOINT}/users/${user?._id}/posts/${postId}/likes`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then(() => {
          setLiked(false);
          onRemoveLike();
        })
        .catch(() => setLiked(true));
    }
  };

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  return (
    <Pressable onPress={likeHandler}>
      <Animated.View
        style={[
          { ...styles.default, ...props.sx },
          { transform: [{ scale: animatedScale }] },
        ]}
      >
        <Icon
          type={liked ? "antdesign" : "feather"}
          name="heart"
          size={props.size ? props.size : 25}
          color={liked ? "#F72A50" : "black"}
        />
      </Animated.View>
    </Pressable>
  );
};

export default LikeIButton;

const styles = StyleSheet.create({
  default: {
    opacity: 0.85,
  },
});
