import { StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const Checkmark = (props) => {
  return (
    <Icon
      name="check"
      type="antdesign"
      size={props.size ? props.size : 10}
      color="white"
      style={{ ...styles.checkmark, ...props.sx }}
    />
  );
};

export default Checkmark;

const styles = StyleSheet.create({
  checkmark: {
    backgroundColor: theme.lightColors.secondary,
    marginLeft: 5,
    padding: 2.5,
    borderRadius: 50,
  },
});
