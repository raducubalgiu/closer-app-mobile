import { ActivityIndicator } from "react-native";
import React from "react";
import Stack from "../Containers/Stack";

const Spinner = (props) => {
  return (
    <Stack justify="center" sx={{ flex: 1, ...props.sx }}>
      <ActivityIndicator />
    </Stack>
  );
};

export default Spinner;
