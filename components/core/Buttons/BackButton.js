import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
      <Icon name="arrow-back" color={Colors.textDark} size={19} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255,255,255,0.5)",
    position: "absolute",
    top: 40,
    left: 15,
    padding: 12,
    borderRadius: 50,
    shadowColor: "#c9c5c5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 11,
    zIndex: 1000,
  },
});
