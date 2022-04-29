import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

const OutlinedButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.button, ...props.sx }}
    >
      <Text style={{ ...styles.buttonText, ...props.sxText }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default OutlinedButton;

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
