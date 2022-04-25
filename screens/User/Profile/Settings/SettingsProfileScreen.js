import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import Header from "../../../../components/customized/Headers/Header";

const SettingsProfileScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Setari" />
      <Divider />
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
