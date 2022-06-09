import { StyleSheet, TextInput, View, Text } from "react-native";
import React, { useState } from "react";
import theme from "../../../assets/styles/theme";

const { grey0 } = theme.lightColors;

export const Textarea = ({
  value,
  onSetValue,
  placeholder,
  lines,
  maxLength,
  autoFocus,
  radius,
  sx,
}) => {
  return (
    <View style={{ ...styles.container, ...sx }}>
      <View style={{ ...styles.textAreaContainer, borderRadius: radius }}>
        <TextInput
          value={value}
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor="#bbb"
          numberOfLines={lines}
          multiline={true}
          onChangeText={(value) => onSetValue(value)}
          maxLength={maxLength}
          autoFocus={autoFocus}
        />
      </View>
      <Text
        style={
          value.length < maxLength
            ? styles.strokeLength
            : { ...styles.strokeLength, color: "#F72A50" }
        }
      >
        {value.length} / {maxLength}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  textAreaContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    padding: 10,
    fontFamily: "Exo-Medium",
  },
  strokeLength: {
    paddingHorizontal: 10,
    fontFamily: "Exo-Medium",
    color: grey0,
    marginTop: 10,
  },
});
