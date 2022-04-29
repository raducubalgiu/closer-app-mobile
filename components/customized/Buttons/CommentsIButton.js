import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const CommentsIButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={{ ...props.sx }}
    >
      <Icon
        type="ionicon"
        name="chatbubble-ellipses-sharp"
        size={props.size ? props.size : 35}
        color="white"
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
