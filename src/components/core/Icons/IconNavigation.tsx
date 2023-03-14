import React from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { grey0 } = theme.lightColors || {};

export const IconNavigation = ({ size = 20 }) => {
  return <Icon name="navigation" type="feather" color={grey0} size={size} />;
};
