import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const CommentsIButton = ({ onPress, sx, size }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={{ ...sx }}>
      <Icon
        type="feather"
        name="message-circle"
        size={size ? size : 24}
        color={black}
      />
    </TouchableOpacity>
  );
};
