import React from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

export const IconLocation = ({ size, sx }) => {
  return (
    <Icon
      name="map-pin"
      type="feather"
      size={size ? size : 20}
      color={theme.lightColors.black}
      containerStyle={sx}
    />
  );
};
