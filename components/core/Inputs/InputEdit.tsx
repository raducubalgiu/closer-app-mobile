import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SearchBar } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { grey0 } = theme.lightColors;

export const InputEdit = ({
  value,
  fieldLength,
  placeholder,
  updateValue,
  withDetails,
}) => {
  return (
    <>
      <View style={{ marginVertical: 10 }}>
        <SearchBar
          placeholder={placeholder}
          onChangeText={updateValue}
          value={value}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          searchIcon={null}
          lightTheme={true}
          autoFocus={true}
          cancelButtonTitle=""
          showCancel={false}
          maxLength={fieldLength}
        />
      </View>
      {withDetails && (
        <Text
          style={
            value?.length < fieldLength
              ? styles.strokeLength
              : { ...styles.strokeLength, color: "#F72A50" }
          }
        >
          {value?.length ? value?.length : 0} / {fieldLength}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "transparent",
    padding: 0,
  },
  inputContainer: {
    backgroundColor: "transparent",
  },
  input: {
    fontSize: 15,
  },
  strokeLength: {
    paddingHorizontal: 10,
    color: grey0,
  },
});
