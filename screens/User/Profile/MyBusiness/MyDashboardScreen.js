import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../../../components/customized/Headers/Header";

const MyDashboardScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Dashboard" />
    </SafeAreaView>
  );
};

export default MyDashboardScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
