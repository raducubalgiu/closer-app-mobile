import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack } from "../Stack/Stack";
import { CheckBox } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const FormInputRadio = ({ text, checked, onPress }) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <CheckBox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={checked}
        onPress={onPress}
        size={27.5}
        containerStyle={{ padding: 0 }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  text: {
    color: black,
    fontSize: 16,
  },
});
