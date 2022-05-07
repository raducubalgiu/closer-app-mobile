import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const ShareIButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={{ ...props.sx }}
    >
      <Icon
        type="feather"
        name="send"
        size={props.size ? props.size : 24}
        color={theme.lightColors.black}
      />
    </TouchableOpacity>
  );
};

export default ShareIButton;
