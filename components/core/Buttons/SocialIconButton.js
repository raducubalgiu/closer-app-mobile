import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const SocialIconButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Icon
        name={name}
        type="feather"
        size={20}
        style={styles.socialBtn}
        color={black}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginLeft: 5,
  },
});
