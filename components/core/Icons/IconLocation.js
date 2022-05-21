import React from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

export const IconLocation = ({ size, sx, color }) => {
  return (
    <Icon
      name="map-pin"
      type="feather"
      size={size ? size : 20}
      color={color ? color : theme.lightColors.grey0}
      containerStyle={sx}
    />
  );
};
