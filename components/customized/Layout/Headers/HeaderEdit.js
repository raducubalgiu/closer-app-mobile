import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, Button } from "../../../core";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

export const HeaderEdit = ({ onSave, title }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={styles.headerCont}>
      <Button onPress={() => navigation.goBack()}>
        <Text style={styles.cancel}>{t("cancel")}</Text>
      </Button>
      <Text style={styles.field}>{title}</Text>
      <Button onPress={onSave}>
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
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    fontSize: 15,
  },
  field: { fontFamily: "Exo-SemiBold", fontSize: 17 },
  save: {
    fontFamily: "Exo-Bold",
    color: theme.lightColors.primary,
    fontSize: 16,
  },
});
