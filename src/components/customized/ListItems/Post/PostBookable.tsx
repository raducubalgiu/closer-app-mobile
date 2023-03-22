import { StyleSheet, Text, Pressable } from "react-native";
import { memo, useEffect } from "react";
import { Icon } from "@rneui/themed";
import { Stack } from "../../../core";
import { Product, User } from "../../../../models";
import theme from "../../../../../assets/styles/theme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

type IProps = {
  product: Product;
  serviceId: string;
  ownerId: User;
  isVisible: boolean;
  expirationTime: string | null;
};
const { black, secondary, error } = theme.lightColors || {};

const PostBookable = ({
  product,
  serviceId,
  ownerId,
  isVisible,
  expirationTime,
}: IProps) => {
  const { name, priceWithDiscount, discount } = product;
  const transitionColor = expirationTime ? secondary : "#f11263";
  const transitionColDisc = expirationTime ? error : "white";
  const animation = useSharedValue(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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

  const colorDisc = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animation.value,
        [0, 1],
        [`${error}`, `${transitionColDisc}`]
      ),
    };
  });

  useEffect(() => {
    if (isVisible) {
      if (animation.value === 0) {
        animation.value = withTiming(1 - animation.value, {
          duration: 1000,
          easing: Easing.exp,
        });
      }
    }
  }, [isVisible]);

  animation.value = 0;

  const goToCalendar = () =>
    navigation.navigate("CalendarBig", {
      product: { ...product, ownerId },
      serviceId,
      expirationTime,
    });

  return (
    <Pressable onPress={goToCalendar}>
      <Animated.View style={[styles.container, bgColor]}>
        <Stack direction="row">
          <Animated.Text style={[styles.name, color]}>{name}</Animated.Text>
        </Stack>
        <Stack direction="row">
          <Animated.Text style={[styles.price, color]}>
            lei {priceWithDiscount}
          </Animated.Text>
          {discount > 0 && (
            <Animated.Text style={[styles.discount, colorDisc]}>
              (-{discount}%)
            </Animated.Text>
          )}
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
  discount: {
    fontSize: 13,
    fontWeight: "600",
  },
});
