import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

export const CardServicesHeader = ({ item, activeService }) => {
  return (
    <Pressable
      style={
        item._id === activeService
          ? { ...styles.button, ...styles.activeBtn }
          : styles.button
      }
      onPress={() => onHandleChangeService(item?._id)}
    >
      <Text
        style={
          item._id === activeService
            ? { ...styles.btnText, ...styles.activeBtnText }
            : styles.btnText
        }
      >
        {item.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    marginRight: 15,
  },
  activeBtn: {
    backgroundColor: theme.lightColors.primary,
  },
  btnText: {},
  activeBtnText: { color: "white" },
});
