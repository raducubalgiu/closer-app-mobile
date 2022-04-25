import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack } from "../../core";
import { Colors } from "../../../assets/styles/Colors";
import CardButton from "../Buttons/CardButton";
import { Icon } from "react-native-elements";

const NotFoundContent = (props) => {
  return (
    <Stack sx={styles.container}>
      <Icon
        name={props.iconName}
        type={props.iconType}
        color={Colors.textDark}
        style={styles.icon}
      />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <CardButton title="Adauga" />
    </Stack>
  );
};

export default NotFoundContent;

const styles = StyleSheet.create({
  container: { backgroundColor: "white", padding: 20 },
  icon: {
    padding: 17.5,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 50,
    marginBottom: 15,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    paddingHorizontal: 20,
    textAlign: "center",
    fontFamily: "Exo-Regular",
    color: Colors.textLight,
    fontSize: 13,
    marginBottom: 25,
  },
});
