import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Divider } from "react-native-elements";
import React from "react";

const MenuItem = (props) => {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <Icon name={props.iconName} type={props.iconType} />
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
      <Divider style={{ marginLeft: 25 }} />
    </>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  button: {
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: "Exo-Medium",
  },
});
