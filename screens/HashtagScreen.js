import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Header } from "../components/core";

const HashtagScreen = ({ route }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title={route.params.name} />
    </SafeAreaView>
  );
};

export default HashtagScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },
});
