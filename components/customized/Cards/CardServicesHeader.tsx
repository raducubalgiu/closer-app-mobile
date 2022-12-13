import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

const { primary } = theme.lightColors || {};

type IProps = { item: any; activeService: any };

export const CardServicesHeader = ({ item, activeService }: IProps) => {
  return (
    <Pressable
      style={
        item._id === activeService
          ? { ...styles.button, ...styles.activeBtn }
          : styles.button
      }
      onPress={() => {}}
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
    backgroundColor: primary,
  },
  btnText: {},
  activeBtnText: { color: "white" },
});
