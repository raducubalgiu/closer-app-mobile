import { ActivityIndicator } from "react-native";
import React from "react";
import { Stack } from "../Stack/Stack";

export const Spinner = ({ sx }) => {
  return (
    <Stack justify="center" sx={{ flex: 1, ...sx }}>
      <ActivityIndicator />
    </Stack>
  );
};
