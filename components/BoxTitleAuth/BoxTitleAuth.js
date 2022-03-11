import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const BoxTitleAuth = (props) => {
  return (
    <>
      <Icon style={styles.icon} name="lock" color="white" />
      <Text style={styles.welcome}>{props.title}</Text>
    </>
  );
};

export default BoxTitleAuth;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#fe9934",
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
  },
  welcome: {
    fontFamily: "Exo-Regular",
    marginBottom: 50,
    fontSize: 27,
  },
});
