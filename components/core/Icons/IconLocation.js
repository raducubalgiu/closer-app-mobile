import React from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { grey0 } = theme.lightColors;

export const IconLocation = ({ size, sx, color }) => {
  return (
    <Icon
      name="map-pin"
      type="feather"
      size={size ? size : 20}
      color={color ? color : grey0}
      containerStyle={sx}
    />
  );
};
