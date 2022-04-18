import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";

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
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 7.5,
    borderRadius: 20,
  },
  btnText: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    fontSize: 13,
  },
  activeBtn: {
    backgroundColor: "#f1f1f1",
    borderColor: "#f1f1f1",
  },
  activeBtnText: {
    color: Colors.textDark,
    fontFamily: "Exo-SemiBold",
  },
});
