import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import { Header } from "../../../../components/core";

const SettingsProfileScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Setari" divider={true} />
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

export default SettingsProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 10,
  },
});
