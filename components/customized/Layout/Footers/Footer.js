import { StyleSheet } from "react-native";
import React from "react";
import { Stack, MainButton } from "../../../core";

export const Footer = ({
  children,
  btnTitle,
  disabled,
  onPress,
  sx,
  loading,
}) => {
  return (
    <Stack direction="row" sx={{ ...styles.footer, ...sx }}>
      <Stack align="start">{children}</Stack>
      <MainButton
        disabled={disabled}
        size="lg"
        loading={loading}
        title={btnTitle}
        onPress={onPress}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
