import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "../../../components/core";
import { useTranslation } from "react-i18next";

export const ReportUserScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("report")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
