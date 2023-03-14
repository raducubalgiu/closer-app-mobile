import { ActivityIndicator, Animated, Pressable } from "react-native";
import { useRef, useEffect } from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { black } = theme.lightColors || {};

type IProps = {
  onPress: () => void;
  sx?: {};
  disabled?: boolean;
  isLoading?: boolean;
};

export const IconButtonDelete = ({
  onPress,
  sx = {},
  disabled = false,
  isLoading,
}: IProps) => {
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
        {!isLoading ? (
          <Icon name="minuscircleo" type="antdesign" color={black} />
        ) : (
          <ActivityIndicator />
        )}
      </Animated.View>
    </Pressable>
  );
};
