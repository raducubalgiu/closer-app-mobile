import React from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

export const IconNavigation = ({ size }) => {
  return (
    <Icon
      name="navigation"
      type="feather"
      color={theme.lightColors.grey0}
      size={size ? size : 20}
    />
  );
};
