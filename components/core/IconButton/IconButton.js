import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const IconButton = ({
  iconName,
  iconType,
  size,
  color,
  sx,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} activeOpacity={1} style={{ ...sx }}>
      <Icon
        type={iconType}
        name={iconName}
        size={size ? size : 24}
        color={color ? color : black}
      />
    </TouchableOpacity>
  );
};
