import { TouchableOpacity } from "react-native";
import React from "react";

export const Button = ({ onPress, children, ...props }) => {
  return (
    <TouchableOpacity
      style={props.sx}
      onPress={onPress}
      activeOpacity={props.activeOpacity ? props.activeOpacity : 1}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};
