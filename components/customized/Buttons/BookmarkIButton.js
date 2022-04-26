import { StyleSheet, Animated, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";

const BookmarkIButton = (props) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const animatedScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/posts/${props.postId}/check-bookmark`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then((res) => {
        setBookmarked(res.data.status);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBookmark = () => {
    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 15,
      speed: 20,
      useNativeDriver: true,
    }).start();

    if (!bookmarked) {
      axios
        .post(
          `${process.env.BASE_ENDPOINT}/users/${user?._id}/bookmarks`,
          {
            post: props.postId,
          },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then(() => setBookmarked(true))
        .catch((err) => console.log(err));
    } else {
      axios
        .delete(
          `${process.env.BASE_ENDPOINT}/users/${user?._id}/posts/${props.postId}/delete-bookmark`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((res) => setBookmarked(res.data.status))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  return (
    <Pressable onPress={handleBookmark}>
      <Animated.View
        style={[
          { ...styles.default, ...props.sx },
          { transform: [{ scale: animatedScale }] },
        ]}
      >
        <Icon
          type={bookmarked ? "feather" : "font-awesome"}
          name={bookmarked ? "check-square" : "bookmark-o"}
          size={props.size ? props.size : 24}
        />
      </Animated.View>
    </Pressable>
  );
};

export default BookmarkIButton;

const styles = StyleSheet.create({
  default: {
    marginLeft: 22.5,
  },
});
