import { SafeAreaView, StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import BottomSheetRecommend from "../components/BottomSheets/BottomSheetRecommend";
import FakeSearchBar from "../components/FakeSearchBar/FakeSearchBar";
import ServicesCategories from "../components/ServicesCategories/ServicesCategories";

const HomeScreen = () => {
  const height = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.screen}>
      <FakeSearchBar />
      <ServicesCategories />
      <BottomSheetRecommend />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default HomeScreen;
