import React from "react";
import { Button } from "../Buttons/Button";
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
    <Button onPress={onPress} sx={{ width: "100%" }}>
      <Stack
        sx={{ marginTop: mt ? mt : 10, ...sx }}
        direction="row"
        align="center"
        justify={justify}
      >
        {children}
      </Stack>
    </Button>
  );
};
