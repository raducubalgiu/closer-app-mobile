import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const IconButton = ({
  iconName,
  iconType,
  size,
  color,
  loading,
  sx,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={1}
      style={{ padding: 2.5, ...sx }}
    >
      {!loading && (
        <Icon
          type={iconType}
          name={iconName}
          size={size ? size : 24}
          color={color ? color : black}
        />
      )}
      {loading && <ActivityIndicator />}
    </TouchableOpacity>
  );
};
