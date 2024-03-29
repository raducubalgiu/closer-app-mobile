import { Animated, StyleSheet, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import theme from "../../../../assets/styles/theme";
import { useDelete, usePost, useAuth } from "../../../hooks";

const { error, black } = theme.lightColors || {};
type IProps = {
  model: string;
  modelId: string;
  size?: number;
  sx?: {};
  color?: any;
  isLiked: boolean;
};

const LikeButton = ({
  model,
  modelId,
  size = 25,
  sx = {},
  color = black,
  isLiked,
}: IProps) => {
  const { user } = useAuth();
  const lastItemId = useRef(modelId);
  const [liked, setLiked] = useState(isLiked);
  if (modelId !== lastItemId.current) {
    lastItemId.current = modelId;
    setLiked(isLiked);
  }

  const endpoints = `/users/${user?.id}/${model}/${modelId}/likes`;
  const animatedScale = useRef(new Animated.Value(0)).current;

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
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      makePost({});
    } else {
      setLiked(false);
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

export default memo(LikeButton);

const styles = StyleSheet.create({
  default: {
    opacity: 0.85,
  },
});
