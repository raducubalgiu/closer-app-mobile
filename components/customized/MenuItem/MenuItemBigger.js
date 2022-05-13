import { StyleSheet, Text } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import React from "react";
import { Button } from "../../core";

const MenuItemBigger = (props) => {
  return (
    <>
      <Button style={styles.container} onPress={props.onPress}>
        <Icon
          name={props.iconName}
          type={props.iconType}
          color={theme.lightColors.black}
          size={26}
        />
        <Text style={styles.textItem}>{props.text}</Text>
      </Button>
      <Divider />
    </>
  );
};

export default MenuItemBigger;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  textItem: {
    fontFamily: "Exo-Regular",
    fontSize: 16,
    color: theme.lightColors.black,
    marginLeft: 10,
  },
});
