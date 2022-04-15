import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const ShareIButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={{ ...styles.default, ...props.sx }}
    >
      <Icon type="feather" name="send" size={props.size ? props.size : 24} />
    </TouchableOpacity>
  );
};

export default ShareIButton;

const styles = StyleSheet.create({
  default: {
    marginLeft: 20,
  },
});
