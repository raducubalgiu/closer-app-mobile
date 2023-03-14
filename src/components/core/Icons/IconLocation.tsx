import React from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { grey0 } = theme.lightColors || {};

export const IconLocation = ({ size = 20, sx = {}, color = grey0 }) => {
  return (
    <Icon
      name="map-pin"
      type="feather"
      size={size}
      color={color}
      containerStyle={sx}
    />
  );
};
