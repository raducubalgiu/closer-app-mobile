import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const SearchEverything = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={{ marginBottom: 50 }}>SearchEverything</Text>
    </SafeAreaView>
  );
};

export default SearchEverything;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
