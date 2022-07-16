import { FAB } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

export const CFAB = ({ icon, placement, onPress }) => {
  return (
    <FAB
      activeOpacity={1}
      icon={icon}
      color={theme.lightColors.primary}
      placement={placement ? placement : "right"}
      onPress={onPress}
      style={{ bottom: 50 }}
    />
  );
};
