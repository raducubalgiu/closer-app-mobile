import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack } from "../../core";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

export const NoFoundMessage = ({ title, description, iconName, iconType }) => {
  return (
    <Stack align="center" justify="center" sx={styles.container}>
      <Icon
        name={iconName ? iconName : "info"}
        type={iconType ? iconType : "simple-line-icon"}
        size={50}
        color="#ddd"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 40, flex: 1 },
  title: {
    fontFamily: "Exo-Medium",
    fontSize: 19.5,
    marginTop: 15,
    marginBottom: 5,
    color: theme.lightColors.black,
  },
  description: {
    fontFamily: "Exo-Regular",
    color: theme.lightColors.grey0,
    textAlign: "center",
    fontSize: 14.5,
  },
});
