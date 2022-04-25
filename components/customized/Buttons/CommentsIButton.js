import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const CommentsIButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={{ ...styles.default, ...props.sx }}
    >
      <Icon
        type="feather"
        name="message-circle"
        size={props.size ? props.size : 24}
      />
    </TouchableOpacity>
  );
};

export default CommentsIButton;

const styles = StyleSheet.create({
  default: {
    marginLeft: 22.5,
  },
});
