import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

export const CardButton = ({ completed, onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={
        !completed
          ? { ...styles.btnContainer, ...styles.completedBtn }
          : { ...styles.btnContainer, ...styles.incompletedBtn }
      }
    >
      <Text
        style={
          !completed
            ? { ...styles.btnText, ...styles.completedText }
            : { ...styles.btnText, ...styles.incompletedText }
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    paddingVertical: 7.5,
    paddingHorizontal: 30,
    borderRadius: 2.5,
    borderWidth: 1,
  },
  btnText: {
    fontSize: 12.5,
  },
  completedBtn: {
    backgroundColor: theme.lightColors.primary,
    borderColor: theme.lightColors.primary,
  },
  incompletedBtn: {
    backgroundColor: "white",
    borderColor: "#ddd",
  },
  completedText: { color: "white" },
  incompletedText: { color: theme.lightColors.black },
});
