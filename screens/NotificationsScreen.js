import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Header } from "../components/core";
import { useTranslation } from "react-i18next";

const NotificationsScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("notifications")} />
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
