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
  ...props
}) => {
  let sizeNum;
  let bgColor;
  let color;

  switch (size) {
    case "sm":
      sizeNum = 7.5;
      break;
    case "md":
      sizeNum = 10;
      break;
    case "lg":
      sizeNum = 15;
      break;
    default:
      sizeNum = 10;
  }

  switch (variant) {
    case "outline":
      bgColor = "white";
      color = theme.lightColors.black;
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
      padding: sizeNum,
      borderRadius: 10,
    },
    containerStyle: {
      width: fullWidth && "100%",
      marginVertical: 10,
    },
    titleStyle: {
      fontFamily: "Exo-Medium",
      fontSize: 15,
      color,
    },
  });

  return (
    <Button
      {...props}
      title={loading ? <ActivityIndicator color="white" /> : title}
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      titleStyle={styles.titleStyle}
    />
  );
};
