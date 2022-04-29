import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
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

const styles = StyleSheet.create({
  default: {
    marginLeft: 22.5,
  },
});
