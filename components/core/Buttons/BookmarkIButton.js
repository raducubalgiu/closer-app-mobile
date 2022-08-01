import { StyleSheet, Animated, Pressable } from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Icon } from "@rneui/themed";
import { useAuth } from "../../../hooks/auth";
import theme from "../../../assets/styles/theme";
import * as Haptics from "expo-haptics";
import { useHttpGet, useHttpPost, useHttpDelete } from "../../../hooks";

const { black } = theme.lightColors;

export const BookmarkIButton = ({ postId, sx, size }) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const animatedScale = useRef(new Animated.Value(0)).current;
  const BOOKMARK_ENDPOINT = `/users/${user?._id}/posts/${postId}/bookmarks`;

  useHttpGet(`${BOOKMARK_ENDPOINT}/check`, (data) => setBookmarked(data));

  const { makePost } = useHttpPost(BOOKMARK_ENDPOINT, () => {
    setBookmarked(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  });

  const { makeDelete } = useHttpDelete(BOOKMARK_ENDPOINT, (data) =>
    setBookmarked(data)
  );

  const handleBookmark = useCallback(() => {
    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 15,
      speed: 20,
      useNativeDriver: true,
    }).start();

    !bookmarked ? makePost({}) : makeDelete();
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
          color={bookmarked ? "#333333" : black}
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
