import React from "react";
import { Stack } from "../Stack/Stack";

export const ListItem = ({ between, around, mt, sx, children }) => {
  let justify;

  if (between) {
    justify = "between";
  } else if (around) {
    justify = "around";
  } else {
    justify = "start";
  }

  return (
    <Stack
      sx={{ marginTop: mt ? mt : 10, width: "100%", ...sx }}
      direction="row"
      justify={justify}
    >
      {children}
    </Stack>
  );
};
