import { ActivityIndicator } from "react-native";
import { Stack } from "../Stack/Stack";

export const Spinner = ({ sx = {} }) => {
  return (
    <Stack justify="center" sx={{ flex: 1, ...sx }}>
      <ActivityIndicator style={{ paddingVertical: 10 }} />
    </Stack>
  );
};
