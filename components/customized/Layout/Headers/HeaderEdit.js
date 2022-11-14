import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, Button } from "../../../core";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

export const HeaderEdit = ({ onSave, title, disabled }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={styles.headerCont}>
      <Button onPress={() => navigation.goBack()} disabled={disabled}>
        <Text style={styles.cancel}>{t("cancel")}</Text>
      </Button>
      <Text style={styles.title}>{title}</Text>
      <Button onPress={onSave} disabled={disabled}>
        <Text style={styles.save}>{t("save")}</Text>
      </Button>
    </Stack>
  );
};

const styles = StyleSheet.create({
  headerCont: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
  },
  cancel: {
    color: theme.lightColors.grey0,
    fontSize: 15,
    fontWeight: "500",
  },
  title: { fontSize: 17, fontWeight: "600" },
  save: {
    color: theme.lightColors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});
