import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack } from "../../core";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

export const NoFoundProducts = () => {
  const { t } = useTranslation();

  return (
    <Stack sx={{ marginHorizontal: 40 }}>
      <Icon name="info" type="simple-line-icon" size={50} color="#ddd" />
      <Text style={styles.title}>{t("myProducts")}</Text>
      <Text style={styles.description}>{t("notProductsAddedForService")}</Text>
    </Stack>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Exo-Medium",
    fontSize: 19.5,
    marginTop: 15,
    marginBottom: 5,
    color: theme.lightColors.black,
  },
  description: {
    fontFamily: "Exo-Regular",
    color: theme.lightColors.grey0,
    textAlign: "center",
    fontSize: 14.5,
  },
});
