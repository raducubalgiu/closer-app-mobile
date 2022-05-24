import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "../components/core";
import { Footer } from "../components/customized";
import { useTranslation } from "react-i18next";

const CalendarScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Calendar" />
      <Footer btnTitle={t("book")}>
        <Text>Hello World</Text>
      </Footer>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
