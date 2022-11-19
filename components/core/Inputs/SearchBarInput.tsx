import { StyleSheet, Platform } from "react-native";
import { SearchBar } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const { grey0, black } = theme.lightColors;

export const SearchBarInput = ({
  cancelButtonTitle = "",
  height = 65,
  showCancel = true,
  ...props
}) => {
  let cancel = !showCancel
    ? {
        color: "gray",
        display: "none",
        buttonTextStyle: styles.cancelBtnText,
      }
    : { color: "gray", buttonTextStyle: styles.cancelBtnText };

  return (
    <SearchBar
      {...props}
      cancelButtonTitle={cancelButtonTitle}
      cancelButtonProps={cancel}
      platform={Platform.OS === "ios" ? "ios" : "android"}
      containerStyle={{
        ...styles.containerStyle,
        height,
      }}
      inputContainerStyle={styles.inputContainerStyle}
      inputStyle={styles.inputStyle}
      placeholderTextColor={grey0}
      searchIcon={styles.searchIcon}
      clearIcon={{ color: theme.lightColors.divider }}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderStyle: "dotted",
    flex: 1,
  },
  inputContainerStyle: {
    backgroundColor: "#f1f1f1",
    flex: 1,
    borderRadius: 2.5,
    marginLeft: 0,
  },
  inputStyle: {
    fontSize: 15,
    color: grey0,
  },
  cancelBtnText: {
    fontSize: 13.5,
    color: black,
    backgroundColor: "white",
    padding: 10,
  },
  searchIcon: { color: black },
});
