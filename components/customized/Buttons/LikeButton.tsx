import { Animated, StyleSheet, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/auth";
import * as Haptics from "expo-haptics";
import theme from "../../../assets/styles/theme";
import { useDelete, useGet, usePost } from "../../../hooks";

const { error, black } = theme.lightColors || {};
type IProps = {
  model: string;
  modelId: string;
  onAddLike: () => void;
  onRemoveLike: () => void;
  size?: number;
  sx?: {};
  color?: any;
};

export const LikeButton = ({
  model,
  modelId,
  onAddLike,
  onRemoveLike,
  size = 25,
  sx = {},
  color = black,
}: IProps) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const endpoints = `/users/${user?.id}/${model}/${modelId}/likes`;
  const animatedScale = useRef(new Animated.Value(0)).current;

  useGet({
    model: "checkLike",
    uri: endpoints,
    onSuccess: (res) => setLiked(res.data.status),
  });

  const { mutate: makePost } = usePost({ uri: endpoints });
  const { mutate: makeDelete } = useDelete({ uri: endpoints });

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
      makePost({});
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
          { ...styles.default, ...sx },
          { transform: [{ scale: animatedScale }] },
        ]}
      >
        <Icon
          type={liked ? "antdesign" : "feather"}
          name="heart"
          size={size}
          color={liked ? error : color}
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
