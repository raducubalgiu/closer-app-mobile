import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";

const ShareIButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={{ ...props.sx }}
    >
      <Icon
        type="fontisto"
        name="share-a"
        size={props.size ? props.size : 25}
        color="white"
      />
    </TouchableOpacity>
  );
};

export default ShareIButton;
