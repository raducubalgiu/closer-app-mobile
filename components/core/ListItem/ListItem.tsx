import { Pressable } from "react-native";
import { Stack } from "../Stack/Stack";

export const ListItem = ({
  between,
  around,
  center,
  mt,
  sx,
  onPress,
  children,
}) => {
  let justify;

  if (between) {
    justify = "between";
  } else if (around) {
    justify = "around";
  } else if (center) {
    justify = "center";
  } else {
    justify = "start";
  }

  return (
    <Pressable onPress={onPress} style={{ width: "100%" }}>
      <Stack
        sx={{ marginTop: mt ? mt : 10, ...sx }}
        direction="row"
        align="center"
        justify={justify}
      >
        {children}
      </Stack>
    </Pressable>
  );
};
