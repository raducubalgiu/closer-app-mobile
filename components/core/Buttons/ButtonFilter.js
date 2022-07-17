import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const ButtonFilter = ({ title, onPress, ...props }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...props.sx }}
      onPress={onPress}
      activeOpacity={1}
    >
      <Text style={{ ...styles.buttonText, ...props.sxText }}>{title}</Text>
      <Icon name="keyboard-arrow-down" color={black} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1f1f1",
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: "Exo-Medium",
    fontSize: 13,
    color: black,
  },
});
