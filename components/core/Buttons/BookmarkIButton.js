import { StyleSheet, Animated, Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Icon } from "@rneui/themed";
import { useAuth } from "../../../hooks/auth";
import theme from "../../../assets/styles/theme";
import * as Haptics from "expo-haptics";

const BookmarkIButton = (props) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const animatedScale = useRef(new Animated.Value(0)).current;
  const BOOKMARK_ENDPOINT = `${process.env.BASE_ENDPOINT}/users/${user?._id}/posts/${props.postId}/bookmarks`;

  useEffect(() => {
    axios
      .get(BOOKMARK_ENDPOINT, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
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
          BOOKMARK_ENDPOINT,
          {},
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then(() => {
          setBookmarked(true);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.message);
        });
    } else {
      axios
        .delete(BOOKMARK_ENDPOINT, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
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
          type="feather"
          name={bookmarked ? "check-square" : "bookmark"}
          size={props.size ? props.size : 24}
          color={bookmarked ? "#333333" : theme.lightColors.black}
        />
      </Animated.View>
    </Pressable>
  );
};

export default BookmarkIButton;

const styles = StyleSheet.create({
  default: {
    marginLeft: 20,
    padding: 5,
  },
});
