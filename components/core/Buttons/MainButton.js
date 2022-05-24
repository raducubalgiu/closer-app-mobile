import { StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

export const MainButton = ({
  title,
  loading,
  size,
  variant,
  fullWidth,
  radius,
  sx,
  ...props
}) => {
  let padding;
  let bgColor;
  let color;
  let border;
  let fontSize;

  switch (size) {
    case "sm":
      padding = { paddingVertical: 7.5, paddingHorizontal: 10 };
      break;
    case "md":
      padding = { paddingVertical: 10, paddingHorizontal: 20 };
      fontSize = 14;
      break;
    case "lg":
      padding = { paddingVertical: 15, paddingHorizontal: 32.5 };
      fontSize = 15;
      break;
    default:
      padding = { paddingVertical: 10, paddingHorizontal: 20 };
      fontSize = 14;
  }

  switch (variant) {
    case "outlined":
      bgColor = "white";
      color = theme.lightColors.black;
      border = { borderWidth: 2, borderColor: theme.lightColors.primary };
      break;
    case "contain":
      bgColor = theme.lightColors.primary;
      color = "white";
      break;
    default:
      bgColor = theme.lightColors.primary;
      color = "white";
  }

  const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: bgColor,
      borderRadius: radius ? radius : 5,
      ...padding,
      ...border,
      ...sx,
    },
    containerStyle: {
      width: fullWidth && "100%",
      marginVertical: 10,
    },
    titleStyle: {
      fontFamily: "Exo-SemiBold",
      fontSize,
      color,
    },
  });

  return (
    <Button
      {...props}
      activeOpacity={1}
      title={loading ? <ActivityIndicator color="white" /> : title}
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      titleStyle={styles.titleStyle}
    />
  );
};
