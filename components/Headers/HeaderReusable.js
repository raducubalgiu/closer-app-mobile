import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HeaderReusable = (props) => {
  return (
    <View style={styles.container}>
      <View>{props.firstBox}</View>
      <View>{props.secondBox}</View>
      <View>{props.thirdBox}</View>
    </View>
  );
};

export default HeaderReusable;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
  },
});
