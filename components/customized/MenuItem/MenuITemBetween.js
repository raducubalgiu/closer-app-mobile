import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";
import { trimFunc } from "../../../utils/trimFunc";

const MenuITemBetween = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text style={styles.buttonText}>
          {trimFunc(props.resultText, props.resultTextLength)}
        </Text>
        <Icon name="keyboard-arrow-right" size={17} />
      </TouchableOpacity>
    </View>
  );
};

export default MenuITemBetween;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  label: {
    fontFamily: "Exo-Medium",
    color: Colors.textDark,
    fontSize: 15,
  },
  button: { flexDirection: "row", alignItems: "center" },
  buttonText: {
    fontFamily: "Exo-Medium",
    marginRight: 10,
    fontSize: 14,
    color: Colors.textLight,
  },
});
