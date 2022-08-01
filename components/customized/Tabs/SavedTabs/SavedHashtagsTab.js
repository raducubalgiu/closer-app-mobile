import { StyleSheet, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";

export const SavedHashtagsTab = ({ user }) => {
  const { t } = useTranslation();

  const noFoundMessage = (
    <NoFoundMessage
      title={t("hashtags")}
      description={t("noFoundSavedHashtags")}
    />
  );

  return <View style={styles.screen}>{noFoundMessage}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
