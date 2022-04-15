import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const Checkmark = (props) => {
  return (
    <Icon
      name="check"
      type="antdesign"
      size={10}
      color="white"
      style={{ ...styles.checkmark, ...props.sx }}
    />
  );
};

export default Checkmark;

const styles = StyleSheet.create({
  checkmark: {
    backgroundColor: "#00ccff",
    marginLeft: 5,
    padding: 2.5,
    borderRadius: 50,
  },
});
