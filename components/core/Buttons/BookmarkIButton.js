import { StyleSheet, Animated, Pressable } from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Icon } from "@rneui/themed";
import { useAuth } from "../../../hooks/auth";
import theme from "../../../assets/styles/theme";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "@react-navigation/native";

export const BookmarkIButton = ({ postId, sx, size }) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const animatedScale = useRef(new Animated.Value(0)).current;
  const BOOKMARK_ENDPOINT = `${process.env.BASE_ENDPOINT}/users/${user?._id}/posts/${postId}/bookmarks`;

  useFocusEffect(
    React.useCallback(() => {
      const controller = new AbortController();

      axios
        .get(
          `${process.env.BASE_ENDPOINT}/users/${user?._id}/posts/${postId}/bookmarks/check`,
          {
            signal: controller.signal,
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then((res) => {
          setBookmarked(res.data.status);
        })
        .catch(() => {});

      return () => {
        controller.abort();
      };
    }, [BOOKMARK_ENDPOINT])
  );

  const handleBookmark = useCallback(() => {
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
  }, [BOOKMARK_ENDPOINT, bookmarked]);

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  return (
    <Pressable onPress={handleBookmark}>
      <Animated.View
        style={[
          { ...styles.default, ...sx },
          { transform: [{ scale: animatedScale }] },
        ]}
      >
        <Icon
          type="feather"
          name={bookmarked ? "check-square" : "bookmark"}
          size={size ? size : 24}
          color={bookmarked ? "#333333" : theme.lightColors.black}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  default: {
    marginLeft: 20,
    padding: 5,
  },
});
