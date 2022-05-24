import React from "react";
import { Stack, MainButton } from "../../../core";

export const Footer = ({ children, btnTitle, onPress, sx }) => {
  return (
    <Stack direction="row" sx={{ marginHorizontal: 15, ...sx }}>
      <Stack>{children}</Stack>
      <MainButton size="lg" title={btnTitle} onPress={onPress} />
    </Stack>
  );
};
