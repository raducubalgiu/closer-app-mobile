import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack } from "../../core";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors;

export const NoFoundMessage = ({
  title,
  description,
  iconName,
  iconType,
  iconSize,
  sx,
}) => {
  return (
    <Stack align="center" justify="center" sx={{ ...styles.container, ...sx }}>
      <Icon
        name={iconName ? iconName : "alert-circle"}
        type={iconType ? iconType : "feather"}
        size={iconSize ? iconSize : 45}
        color="#ddd"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 100, paddingHorizontal: 50 },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 19.5,
    marginTop: 15,
    marginBottom: 5,
    color: black,
  },
  description: {
    color: grey0,
    textAlign: "center",
    fontSize: 15.5,
  },
});
