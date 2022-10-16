import React from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { grey0 } = theme.lightColors;

export const IconNavigation = ({ size }) => {
  return (
    <Icon
      name="navigation"
      type="feather"
      color={grey0}
      size={size ? size : 20}
    />
  );
};
