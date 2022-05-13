import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

export const FeedLabelButton = ({ isActive, text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        isActive ? { ...styles.btnList, ...styles.activeBtn } : styles.btnList
      }
    >
      <Text
        style={
          isActive
            ? { ...styles.btnText, ...styles.activeBtnText }
            : styles.btnText
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

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
