import React from "react";
import { Button } from "../Buttons/Button";
import { Stack } from "../Stack/Stack";

export const ListItem = ({ between, around, mt, sx, onPress, children }) => {
  let justify;

  if (between) {
    justify = "between";
  } else if (around) {
    justify = "around";
  } else {
    justify = "start";
  }

  return (
    <Button onPress={onPress}>
      <Stack
        sx={{ marginTop: mt ? mt : 10, width: "100%", ...sx }}
        direction="row"
        align="start"
        justify={justify}
      >
        {children}
      </Stack>
    </Button>
  );
};
