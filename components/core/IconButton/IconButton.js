import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const IconButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={{ ...props.sx }}
    >
      <Icon
        size={props.size}
        type={props.iconType}
        name={props.iconName}
        color={props.color}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
