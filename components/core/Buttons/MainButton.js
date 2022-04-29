import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const MainButton = (props) => {
  return (
    <Button
      {...props}
      loading={props.loading}
      onPress={props.onPress}
      title={props.title}
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      titleStyle={styles.titleStyle}
      disabled={props.disabled}
    />
  );
};

export default MainButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.lightColors.primary,
    padding: 15,
    borderRadius: 10,
  },
  containerStyle: {
    width: "100%",
    marginVertical: 10,
  },
  titleStyle: {
    fontFamily: "Exo-Medium",
    fontSize: 15,
  },
});
