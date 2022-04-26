import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../../../components/customized/Headers/Header";

const MyLocationScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Locatia mea" />
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
