import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const BookmarkIButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={{ ...styles.default, ...props.sx }}
    >
      <Icon
        type="font-awesome"
        name={props.isBookmark ? "bookmark" : "bookmark-o"}
        size={props.size ? props.size : 24}
      />
    </TouchableOpacity>
  );
};

export default BookmarkIButton;

const styles = StyleSheet.create({
  default: {
    marginLeft: 22.5,
  },
});
