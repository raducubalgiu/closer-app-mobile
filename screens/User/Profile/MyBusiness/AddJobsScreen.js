import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "../../../../components/core";

const AddJobsScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Adauga un job" />
      <Text>AddJobsScreen</Text>
    </SafeAreaView>
  );
};

export default AddJobsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
