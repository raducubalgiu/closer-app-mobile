import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";

const IconButton = (props) => {
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
        color={props.color ? props.color : Colors.textDark}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
