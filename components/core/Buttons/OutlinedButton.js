import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

export const OutlinedButton = ({ title, onPress, sx, sxText }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{ ...styles.button, ...sx }}
    >
      <Text style={{ ...styles.buttonText, ...sxText }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    paddingVertical: 7.5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: theme.lightColors.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
    textAlign: "center",
  },
});
