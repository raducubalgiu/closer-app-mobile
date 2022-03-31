import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";

const ButtonProvider = (props) => {
  return (
    <TouchableOpacity style={styles.providerBtn} onPress={props.onPress}>
      <View style={styles.providerContainer}>
        <Icon name={props.iconName} type={props.iconType} color={props.color} />
        <Text style={styles.providerBtnText}>{props.text}</Text>
        <Icon name="google" type="antdesign" color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonProvider;

const styles = StyleSheet.create({
  providerBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  providerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  providerBtnText: {
    fontFamily: "Exo-Medium",
    textAlign: "center",
    color: Colors.textDark,
  },
});
