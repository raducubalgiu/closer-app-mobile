import { FAB } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const { primary } = theme.lightColors;

export const CFAB = ({ icon, placement, onPress, bottom }) => {
  return (
    <FAB
      activeOpacity={1}
      icon={icon}
      color={primary}
      placement={placement ? placement : "right"}
      onPress={onPress}
      style={bottom && { bottom: bottom }}
    />
  );
};
