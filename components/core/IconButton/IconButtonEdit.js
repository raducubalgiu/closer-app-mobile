import { Animated, Pressable } from "react-native";
import React, { useRef, useEffect } from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const IconButtonEdit = ({ onPress }) => {
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
    <Pressable onPress={handlePress}>
      <Animated.View style={[{ transform: [{ scale: animatedScale }] }]}>
        <Icon name="edit" type="feather" color={black} />
      </Animated.View>
    </Pressable>
  );
};
