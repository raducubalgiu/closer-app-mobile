import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

const FeedLabelButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={
        props.isActive
          ? { ...styles.btnList, ...styles.activeBtn }
          : styles.btnList
      }
    >
      <Text
        style={
          props.isActive
            ? { ...styles.btnText, ...styles.activeBtnText }
            : styles.btnText
        }
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default FeedLabelButton;

const styles = StyleSheet.create({
  btnList: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 7.5,
    borderRadius: 20,
    paddingVertical: 6.5,
    paddingHorizontal: 15,
  },
  btnText: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    fontSize: 13,
  },
  activeBtn: {
    borderWidth: 1.25,
    backgroundColor: "#f1f1f1",
    borderColor: "#f1f1f1",
  },
  activeBtnText: {
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
  },
});
