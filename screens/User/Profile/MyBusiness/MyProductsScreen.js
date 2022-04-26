import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Header from "../../../../components/customized/Headers/Header";

const MyProductsScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Produsele mele" />
    </SafeAreaView>
  );
};

export default MyProductsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
