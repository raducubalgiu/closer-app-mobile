import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import { Header } from "../../../../components/core";

const DiscountsProfileScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Discounturi" divider={true} />
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

export default DiscountsProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 10,
  },
});
