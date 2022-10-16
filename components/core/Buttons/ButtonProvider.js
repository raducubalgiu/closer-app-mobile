import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

export const ButtonProvider = ({
  onPress,
  iconName,
  iconType,
  color,
  text,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.providerBtn}
      onPress={onPress}
    >
      <View style={styles.providerContainer}>
        <Icon name={iconName} type={iconType} color={color} />
        <Text style={styles.providerBtnText}>{text}</Text>
        <Icon name="google" type="antdesign" color="white" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  providerBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  providerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  providerBtnText: {
    textAlign: "center",
    color: theme.lightColors.black,
  },
});
