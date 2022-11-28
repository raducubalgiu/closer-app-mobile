import { Animated, Pressable } from "react-native";
import { useRef, useEffect } from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { primary } = theme.lightColors || {};
type Props = { onPress: () => void; sx: {}; disabled: boolean };

export const IconButtonAdd = ({
  onPress,
  sx = {},
  disabled = false,
}: Props) => {
  const animatedScale = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    animatedScale.setValue(0.85);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 15,
      speed: 20,
      useNativeDriver: true,
    }).start();

    onPress();
  };

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  return (
    <Pressable onPress={handlePress} style={sx} disabled={disabled}>
      <Animated.View style={[{ transform: [{ scale: animatedScale }] }]}>
        <Icon
          name="pluscircle"
          type="antdesign"
          color={!disabled ? primary : "#ddd"}
          size={30}
        />
      </Animated.View>
    </Pressable>
  );
};
