import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import CardButton from "../../core/Buttons/CardButton";
import { Icon } from "@rneui/themed";

const NotFoundContent = (props) => {
  return (
    <Stack sx={styles.container}>
      <Icon
        name={props.iconName}
        type={props.iconType}
        color={theme.lightColors.black}
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
    color: theme.lightColors.black,
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    paddingHorizontal: 20,
    textAlign: "center",
    fontFamily: "Exo-Regular",
    color: theme.lightColors.grey0,
    fontSize: 13,
    marginBottom: 25,
  },
});
