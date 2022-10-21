import { Animated, StyleSheet, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/auth";
import * as Haptics from "expo-haptics";
import theme from "../../../assets/styles/theme";
import { useHttpGet, useHttpPost, useHttpDelete } from "../../../hooks";

const { error } = theme.lightColors;

export const LikeButton = ({ postId, onAddLike, onRemoveLike, ...props }) => {
  const [liked, setLiked] = useState(true);
  const { user } = useAuth();
  const endpoints = `/users/${user?._id}/posts/${postId}/likes`;
  const animatedScale = useRef(new Animated.Value(0)).current;

  useHttpGet(`${endpoints}`, (data) => setLiked(data.status));
  const { makePost } = useHttpPost(endpoints);
  const { makeDelete } = useHttpDelete(endpoints);

  const likeHandler = useCallback(() => {
    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 15,
      speed: 20,
      useNativeDriver: true,
    }).start();

    if (!liked) {
      setLiked(true);
      onAddLike();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      makePost();
    } else {
      setLiked(false);
      onRemoveLike();
      makeDelete();
    }
  }, [liked, endpoints]);

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
          color={liked ? error : "black"}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  default: {
    opacity: 0.85,
  },
});
