import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";

const OutlinedButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.buttonText}>{props.title}</Text>
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
    borderColor: Colors.primary,
    borderRadius: 5,
  },
  buttonText: { color: Colors.textDark, fontFamily: "Exo-Medium" },
});
