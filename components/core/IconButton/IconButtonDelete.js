import { Animated, Pressable } from "react-native";
import React, { useRef, useEffect } from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

export const IconButtonDelete = ({ onPress, sx }) => {
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
    <Pressable onPress={handlePress} style={sx}>
      <Animated.View style={[{ transform: [{ scale: animatedScale }] }]}>
        <Icon
          name="minuscircleo"
          type="antdesign"
          color={theme.lightColors.black}
        />
      </Animated.View>
    </Pressable>
  );
};
