import { StyleSheet, Platform, Keyboard } from "react-native";
import { SearchBar } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

export const SearchBarInput = ({
  cancelButtonTitle,
  height,
  showCancel,
  ...props
}) => {
  const styles = StyleSheet.create({
    containerStyle: {
      borderStyle: "dotted",
      height: height ? height : 65,
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
      color: theme.lightColors.grey0,
      fontFamily: "Exo-Regular",
    },
    cancelBtnText: {
      fontSize: 13.5,
      fontFamily: "Exo-Bold",
      color: theme.lightColors.black,
      backgroundColor: "white",
      padding: 10,
    },
    searchIcon: { color: theme.lightColors.black },
    placeholderColor: { color: theme.lightColors.grey0 },
  });

  return (
    <SearchBar
      cancelButtonTitle={cancelButtonTitle}
      cancelButtonProps={
        showCancel === false
          ? {
              color: "gray",
              display: "none",
              buttonTextStyle: styles.cancelBtnText,
            }
          : { color: "gray", buttonTextStyle: styles.cancelBtnText }
      }
      platform={Platform.OS === "ios" ? "ios" : "android"}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      inputStyle={styles.inputStyle}
      placeholderTextColor={styles.placeholderColor}
      searchIcon={styles.searchIcon}
      clearIcon={{ color: theme.lightColors.divider }}
      {...props}
    />
  );
};
