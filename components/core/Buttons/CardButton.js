import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

const CardButton = (props) => {
  return (
    <TouchableOpacity
      style={
        !props.completed
          ? { ...styles.btnContainer, ...styles.completedBtn }
          : { ...styles.btnContainer, ...styles.incompletedBtn }
      }
      onPress={props.onPress}
    >
      <Text
        style={
          !props.completed
            ? { ...styles.btnText, ...styles.completedText }
            : { ...styles.btnText, ...styles.incompletedText }
        }
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CardButton;

const styles = StyleSheet.create({
  btnContainer: {
    paddingVertical: 7.5,
    paddingHorizontal: 30,
    borderRadius: 2.5,
    borderWidth: 1,
  },
  btnText: {
    fontFamily: "Exo-Medium",
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
