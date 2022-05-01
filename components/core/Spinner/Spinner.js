import { ActivityIndicator } from "react-native";
import React from "react";
import Stack from "../Containers/Stack";

const Spinner = () => {
  return (
    <Stack justify="center" sx={{ flex: 1 }}>
      <ActivityIndicator />
    </Stack>
  );
};

export default Spinner;
