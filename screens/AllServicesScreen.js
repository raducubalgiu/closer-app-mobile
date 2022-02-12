import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import BackButton from "../components/BackButton/BackButton";
import React from "react";

const AllServicesScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <BackButton />
    </SafeAreaView>
  );
};

export default AllServicesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
