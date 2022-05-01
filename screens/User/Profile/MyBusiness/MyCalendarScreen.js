import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Header } from "../../../../components/core";

const MyCalendarScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Calendarul meu" />
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
