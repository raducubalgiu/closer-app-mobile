import { StyleSheet, Text, Pressable } from "react-native";
import { memo, useEffect } from "react";
import { Icon } from "@rneui/themed";
import { Stack } from "../../../core";
import { Product } from "../../../../models";
import theme from "../../../../../assets/styles/theme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

type IProps = {
  product: Product;
  isVisible: boolean;
  expirationTime: string | null;
};
const { black, secondary, error } = theme.lightColors || {};

const PostBookable = ({ product, isVisible, expirationTime }: IProps) => {
  const { name, price } = product;
  const transitionColor = expirationTime ? "#f11263" : secondary;
  const animation = useSharedValue(0);

  const bgColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [0, 1],
        ["white", `${transitionColor}`]
      ),
    };
  });

  const color = useAnimatedStyle(() => {
    return {
      color: interpolateColor(animation.value, [0, 1], [`${black}`, "white"]),
    };
  });

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        if (animation.value === 0) {
          animation.value = withTiming(1 - animation.value, {
            duration: 500,
          });
        }
      }, 500);
    }
  }, [isVisible]);

  animation.value = 0;

  return (
    <Pressable onPress={() => {}}>
      <Animated.View style={[styles.container, bgColor]}>
        <Stack direction="row">
          <Animated.Text style={[styles.name, color]}>{name}</Animated.Text>
        </Stack>
        <Stack direction="row">
          <Animated.Text style={[styles.price, color]}>
            lei {price}
          </Animated.Text>
          <Icon name="keyboard-arrow-right" color={black} size={22.5} />
        </Stack>
      </Animated.View>
    </Pressable>
  );
};

export default memo(PostBookable);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "600",
    fontSize: 14.5,
  },
  price: {
    fontWeight: "700",
    marginRight: 10,
    fontSize: 14,
  },
});
