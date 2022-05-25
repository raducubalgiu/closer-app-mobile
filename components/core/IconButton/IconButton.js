import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

export const IconButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={{ ...props.sx }}
    >
      <Icon
        type={props.iconType}
        name={props.iconName}
        size={props.size ? props.size : 24}
        color={props.color ? props.color : theme.lightColors.black}
      />
    </TouchableOpacity>
  );
};
