import { StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

const { grey0 } = theme.lightColors || {};

type IProps = {
  value: string;
  onSetValue: (text: string) => void;
  placeholder?: string;
  lines: number;
  maxLength: number;
  showLength?: boolean;
  autoFocus?: boolean;
  sx?: {};
  label?: string;
};

export const Textarea = ({
  value,
  onSetValue,
  placeholder = "",
  lines,
  maxLength,
  showLength = true,
  autoFocus = false,
  sx = {},
  label = "",
}: IProps) => {
  return (
    <View style={{ ...styles.container, ...sx }}>
      {label?.length > 0 && <Text style={styles.label}>{label}</Text>}
      <View style={styles.textAreaContainer}>
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
      {showLength && (
        <Text
          style={
            value.length < maxLength
              ? styles.strokeLength
              : { ...styles.strokeLength, color: "#F72A50" }
          }
        >
          {value.length} / {maxLength}
        </Text>
      )}
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
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    padding: 10,
  },
  strokeLength: {
    paddingHorizontal: 10,
    color: grey0,
    marginTop: 10,
  },
  label: {
    textTransform: "uppercase",
    color: grey0,
    marginBottom: 2.5,
  },
});
