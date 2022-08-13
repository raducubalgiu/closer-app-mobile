import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SearchBar } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

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
          searchIcon={""}
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
    borderStyle: "dashed",
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    fontFamily: "Exo-Medium",
    fontSize: 15,
  },
  strokeLength: {
    paddingHorizontal: 10,
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
  },
});
