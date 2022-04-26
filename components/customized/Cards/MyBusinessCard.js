import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { Colors } from "../../../assets/styles/Colors";

const MyBusinessCard = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...props.sx }}
      onPress={props.onPress}
    >
      <Icon
        name={props.iconName}
        type={props.iconType}
        size={props.size ? props.size : 30}
        color={Colors.textDark}
      />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </TouchableOpacity>
  );
};

export default MyBusinessCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontFamily: "Exo-SemiBold",
    marginVertical: 10,
    fontSize: 15,
    color: Colors.textDark,
  },
  description: {
    textAlign: "center",
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
  },
});
