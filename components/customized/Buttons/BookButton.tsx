import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { primary } = theme.lightColors;

export const BookButton = ({ bookAgain = false, onPress }) => {
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: primary,
      width: 120,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 2.5,
      marginLeft: 10,
    },
    text: {
      color: "white",
      fontWeight: "600",
      fontSize: bookAgain ? 13 : 14,
    },
  });

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{bookAgain ? "Rez..din nou" : t("book")}</Text>
    </Pressable>
  );
};
