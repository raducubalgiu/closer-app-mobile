import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "../../../../components/core";
import AddLocationScreen from "./AddLocationScreen";

const MyLocationScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Locatia mea" />
      <AddLocationScreen />
    </SafeAreaView>
  );
};

export default MyLocationScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
