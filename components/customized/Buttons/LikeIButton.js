import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";

const LikeIButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={{ ...styles.default, ...props.sx }}
    >
      <Icon
        type="antdesign"
        name={props.isLike ? "heart" : "hearto"}
        size={props.size ? props.size : 24}
        color={props.isLike ? "#fb3958" : ""}
      />
    </TouchableOpacity>
  );
};

export default LikeIButton;

const styles = StyleSheet.create({
  default: {
    marginLeft: 22.5,
  },
});
