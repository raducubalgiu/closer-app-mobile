import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import { Header } from "../../../../components/core";

const SchedulesProfileScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Programari" divider={true} />
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

export default SchedulesProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 10,
  },
});
