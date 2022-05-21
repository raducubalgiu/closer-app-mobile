import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Header } from "../../../../components/core";
import { useTranslation } from "react-i18next";

const MyCalendarScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myCalendar")} />
    </SafeAreaView>
  );
};

export default MyCalendarScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
