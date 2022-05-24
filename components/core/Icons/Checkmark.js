import { StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const Checkmark = ({ size, sx }) => {
  return (
    <Icon
      name="check"
      type="entypo"
      size={size ? size : 10}
      color="white"
      style={{ ...styles.checkmark, ...sx }}
    />
  );
};

export default Checkmark;

const styles = StyleSheet.create({
  checkmark: {
    backgroundColor: theme.lightColors.secondary,
    marginLeft: 7.5,
    paddingVertical: 1.5,
    paddingHorizontal: 1.75,
    borderRadius: 50,
  },
});
