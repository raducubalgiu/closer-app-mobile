import { StyleSheet, Animated, Pressable } from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Icon } from "@rneui/themed";
import { useAuth } from "../../../hooks/auth";
import theme from "../../../assets/styles/theme";
import * as Haptics from "expo-haptics";
import { usePost, useDelete, useGet } from "../../../hooks";

const { black } = theme.lightColors;

export const BookmarkIconButton = ({ sx, size, type, typeId }) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const animatedScale = useRef(new Animated.Value(0)).current;
  const bookmarkEndpoints = `/users/${user._id}/${type}/${typeId}/bookmarks`;

  useGet({
    model: "checkBookmark",
    uri: bookmarkEndpoints,
    onSuccess: (res) => setBookmarked(res.data.status),
  });
  const { mutate: makePost } = usePost({ uri: bookmarkEndpoints });
  const { mutate: makeDelete } = useDelete({ uri: bookmarkEndpoints });

  const handleBookmark = useCallback(() => {
    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 15,
      speed: 20,
      useNativeDriver: true,
    }).start();

    if (!bookmarked) {
      setBookmarked(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      makePost();
    } else {
      setBookmarked(false);
      makeDelete();
    }
  }, [bookmarked, bookmarkEndpoints]);

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
