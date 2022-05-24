import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, MainButton } from "../../../core";

export const Footer = ({ children, btnTitle, onPress }) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <Text>{children}</Text>
      <MainButton size="lg" title={btnTitle} onPress={onPress} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 40,
  },
});
